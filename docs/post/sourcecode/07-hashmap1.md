---
title: 源码解析-HashMap(一)
---

::: tip
本文主要是介绍 源码解析-HashMap(一)。
:::

[[toc]]

## **HashMap源码分析**

HashMap的底层实现是面试中问到最多的，其原理也更加复杂，涉及的知识也越多，在项目中的使用也最多。因此清晰分析出其底层源码对于深刻理解其实现有重要的意义，jdk1.8之后其设计与实现也有所改变。

在Java集合类中最常用的除了ArrayList外，就是HashMap了。Java最基本的数据结构有数组和链表。数组的特点是空间连续（大小固定）、寻址迅速，但是插入和删除时需要移动元素，所以查询快，增加删除慢。链表恰好相反，可动态增加或减少空间以适应新增和删除元素，但查找时只能顺着一个个节点查找，所以增加删除快，查找慢。有没有一种结构综合了数组和链表的优点呢？当然有，那就是哈希表（虽说是综合优点，但实际上查找肯定没有数组快，插入删除没有链表快，一种折中的方式吧）。

## **主要知识点**：

1. 哈希表综合了数组和链表的特点。一般采用拉链法实现哈希表；

2. 概括的说，HashMap 是一个关联数组、哈希表，它是线程不安全的，允许key为null,value为null。遍历时无序；

3. 其底层数据结构是数组称之为哈希桶，每个桶里面放的是链表，链表中的每个节点，就是哈希表中的每个元素；

4. 在JDK8中，当链表长度达到8，会转化成红黑树，以提升它的查询、插入效率；

5. 因其底层哈希桶的数据结构是数组，所以也会涉及到扩容的问题。当HashMap的容量达到threshold域值时，就会触发扩容。扩容前后，哈希桶的长度一定会是2的次方。这样在根据key的hash值寻找对应的哈希桶时，可以用位运算替代取余操作，更加高效。

6. 而key的hash值，并不仅仅只是key对象的hashCode()方法的返回值，还会经过扰动函数的扰动，以使hash值更加均衡。

7. 扰动函数就是为了解决hash碰撞的。它会综合hash值高位和低位的特征，并存放在低位，因此在与运算时，相当于高低位一起参与了运算，以减少hash碰撞的概率。（在JDK8之前，扰动函数会扰动四次，JDK8简化了这个操作）

8. 扩容操作时，会new一个新的Node数组作为哈希桶，然后将原哈希表中的所有数据(Node节点)移动到新的哈希桶中，相当于对原哈希表中所有的数据重新做了一个put操作。所以性能消耗很大，可想而知，在哈希表的容量越大时，性能消耗越明显。

9. 扩容时，如果发生过哈希碰撞，节点数小于8个。则要根据链表上每个节点的哈希值，依次放入新哈希桶对应下标位置。

   因为扩容是容量翻倍，所以原链表上的每个节点，现在可能存放在原来的下标，即low位， 或者扩容后的下标，即high位。 high位= low位+原哈希桶容量。


## **一、类声明**

```java
public class HashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>, Cloneable, Serializable
```

HashMap继承自AbstractMap，实现了Map接口，Map接口定义了所有Map子类必须实现的方法。AbstractMap也实现了Map接口，并且提供了两个实现Entry的内部类：SimpleEntry和SimpleImmutableEntry。

 

## **二、成员变量**



```java
//默认的初始容量，必须是2的幂。
static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;
//最大容量（必须是2的幂且小于2的30次方，传入容量过大将被这个值替换）
static final int MAXIMUM_CAPACITY = 1 << 30;
//默认装载因子，默认值为0.75，如果实际元素所占容量占分配容量的75%时就要扩容了。如果填充比很大，说明利用的空间很多，但是查找的效率很低，因为链表的长度很大（当然最新版本使用了红黑树后会改进很多），HashMap本来是以空间换时间，所以填充比没必要太大。但是填充比太小又会导致空间浪费。如果关注内存，填充比可以稍大，如果主要关注查找性能，填充比可以稍小。
static final float _LOAD_FACTOR = 0.75f;

//一个桶的树化阈值
//当桶中元素个数超过这个值时，需要使用红黑树节点替换链表节点
//这个值必须为 8，要不然频繁转换效率也不高
static final int TREEIFY_THRESHOLD = 8;

//一个树的链表还原阈值
//当扩容时，桶中元素个数小于这个值，就会把树形的桶元素 还原（切分）为链表结构
//这个值应该比上面那个小，至少为 6，避免频繁转换
static final int UNTREEIFY_THRESHOLD = 6;

//哈希表的最小树形化容量
//当哈希表中的容量大于这个值时，表中的桶才能进行树形化
//否则桶内元素太多时会扩容，而不是树形化
//为了避免进行扩容、树形化选择的冲突，这个值不能小于 4 * TREEIFY_THRESHOLD
static final int MIN_TREEIFY_CAPACITY = 64;

//存储数据的Entry数组，长度是2的幂。
transient Entry[] table;
//
transient Set<Map.Entry<K,V>> entrySet;
//map中保存的键值对的数量
transient int size;
//需要调整大小的极限值（容量*装载因子）
int threshold;
//装载因子
final float loadFactor;
//map结构被改变的次数
transient volatile int modCount;
```



内部类，链表节点Node：



```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
    Node(int hash, K key, V value, Node<K,V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }
    public final K getKey()        { return key; }
    public final V getValue()      { return value; }
    public final String toString() { return key + "=" + value; }

    public final int hashCode() {
        return Objects.hashCode(key) ^ Objects.hashCode(value);
    }
    public final V setValue(V newValue) {
        V oldValue = value;
        value = newValue;
        return oldValue;
    }
    public final boolean equals(Object o) {
        if (o == this)
            return true;
        if (o instanceof Map.Entry) {
            Map.Entry<?,?> e = (Map.Entry<?,?>)o;
            if (Objects.equals(key, e.getKey()) &&Objects.equals(value, e.getValue()))
                return true;
            }
        return false;
    }
}
```



 

## **三、构造方法**



```java
/**
*使用默认的容量及装载因子构造一个空的HashMap
*/
public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR;
}

/**
* 根据给定的初始容量和装载因子创建一个空的HashMap
* 初始容量小于0或装载因子小于等于0将报异常 
*/
public HashMap(int initialCapacity, float loadFactor) {
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " +initialCapacity);
    if (initialCapacity > MAXIMUM_CAPACITY)//调整最大容量
        initialCapacity = MAXIMUM_CAPACITY;
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " +loadFactor);
    this.loadFactor = loadFactor;
        this.threshold = tableSizeFor(initialCapacity);
}

/**
*根据指定容量创建一个空的HashMap
*/
public HashMap(int initialCapacity) {
    //调用上面的构造方法，容量为指定的容量，装载因子是默认值
    this(initialCapacity, DEFAULT_LOAD_FACTOR);
}
//通过传入的map创建一个HashMap，容量为默认容量（16）和(map.zise()/DEFAULT_LOAD_FACTORY)+1的较大者，装载因子为默认值
public HashMap(Map<? extends K, ? extends V> m) {
    this.loadFactor = DEFAULT_LOAD_FACTOR;
    putMapEntries(m, false);
}
```



HashMap提供了四种构造方法：

（1）使用默认的容量及装载因子构造一个空的HashMap；

（2）根据给定的初始容量和装载因子创建一个空的HashMap；

（3）根据指定容量创建一个空的HashMap；

（4）通过传入的map创建一个HashMap。

第三种构造方法会调用第二种构造方法，而第四种构造方法将会调用putMapEntries方法将元素添加到HashMap中去。

putMapEntries方法是一个final方法，不可以被修改，该方法实现了将另一个Map的所有元素加入表中，参数evict初始化时为false，其他情况为true



```java
final void putMapEntries(Map<? extends K, ? extends V> m, boolean evict) {
    int s = m.size();
    if (s > 0) {
        if (table == null) { 
        //根据m的元素数量和当前表的加载因子，计算出阈值
        float ft = ((float)s / loadFactor) + 1.0F;
        //修正阈值的边界 不能超过MAXIMUM_CAPACITY
        int t = ((ft < (float)MAXIMUM_CAPACITY) ?(int)ft : MAXIMUM_CAPACITY);
        //如果新的阈值大于当前阈值
        if (t > threshold)
            //返回一个>=新的阈值的 满足2的n次方的阈值
            threshold = tableSizeFor(t);
        }
        //如果当前元素表不是空的，但是 m的元素数量大于阈值，说明一定要扩容。
        else if (s > threshold)
            resize();
        //遍历 m 依次将元素加入当前表中。
        for (Map.Entry<? extends K, ? extends V> e : m.entrySet()) {
            K key = e.getKey();
            V value = e.getValue();
            putVal(hash(key), key, value, false, evict);
        }
    }
}
```



其中，涉及到两个操作，一个是计算新的阈值，另一个是扩容方法：

　　1）如果新的阈值大于当前阈值，需要返回一个>=新的阈值的 满足2的n次方的阈值，这涉及到了tableSizeFor：



```java
static final int tableSizeFor(int cap) {
    //经过下面的 或 和位移 运算， n最终各位都是1。
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    //判断n是否越界，返回 2的n次方作为 table（哈希桶）的阈值
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```



　　2）如果当前元素表不是空的，但是 m的元素数量大于阈值，说明一定要扩容。这涉及到了扩容方法resize，这是个人认为HashMap中最复杂的方法：



```java
final Node<K,V>[] resize() {
    //oldTab 为当前表的哈希桶
    Node<K,V>[] oldTab = table;
    //当前哈希桶的容量 length
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    //当前的阈值
    int oldThr = threshold;
    //初始化新的容量和阈值为0
    int newCap, newThr = 0;
    //如果当前容量大于0
    if (oldCap > 0) {
        //如果当前容量已经到达上限
        if (oldCap >= MAXIMUM_CAPACITY) {
            //则设置阈值是2的31次方-1
            threshold = Integer.MAX_VALUE;
            //同时返回当前的哈希桶，不再扩容
            return oldTab;
        }//否则新的容量为旧的容量的两倍。 
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
            oldCap >= DEFAULT_INITIAL_CAPACITY)
            //如果旧的容量大于等于默认初始容量16
            //那么新的阈值也等于旧的阈值的两倍
            newThr = oldThr << 1; // double threshold
    }
    //如果当前表是空的，但是有阈值。代表是初始化时指定了容量、阈值的情况
    else if (oldThr > 0) 
        newCap = oldThr;//那么新表的容量就等于旧的阈值
    else {    
    //如果当前表是空的，而且也没有阈值。代表是初始化时没有任何容量/阈值参数的情况               
        newCap = DEFAULT_INITIAL_CAPACITY;//此时新表的容量为默认的容量 16
    //新的阈值为默认容量16 * 默认加载因子0.75f = 12
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    if (newThr == 0) {
        //如果新的阈值是0，对应的是  当前表是空的，但是有阈值的情况
        float ft = (float)newCap * loadFactor;//根据新表容量 和 加载因子 求出新的阈值
        //进行越界修复
        newThr = (newCap < MAXIMUM_CAPACITY && ft <(float)MAXIMUM_CAPACITY ? (int)ft : Integer.MAX_VALUE);
    }
    //更新阈值 
    threshold = newThr;
    @SuppressWarnings({"rawtypes","unchecked"})
    //根据新的容量 构建新的哈希桶
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    //更新哈希桶引用
    table = newTab;
    //如果以前的哈希桶中有元素
    //下面开始将当前哈希桶中的所有节点转移到新的哈希桶中
    if (oldTab != null) {
        //遍历老的哈希桶
        for (int j = 0; j < oldCap; ++j) {
        //取出当前的节点 e
        Node<K,V> e;
        //如果当前桶中有元素,则将链表赋值给e
        if ((e = oldTab[j]) != null) {
            //将原哈希桶置空以便GC
            oldTab[j] = null;
            //如果当前链表中就一个元素，（没有发生哈希碰撞）
            if (e.next == null)
            //直接将这个元素放置在新的哈希桶里。
            //注意这里取下标 是用 哈希值 与 桶的长度-1 。 由于桶的长度是2的n次方，这么做其实是等于 一个模运算。但是效率更高
            newTab[e.hash & (newCap - 1)] = e;
            //如果发生过哈希碰撞 ,而且是节点数超过8个，转化成了红黑树
            else if (e instanceof TreeNode)
                 ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
            //如果发生过哈希碰撞，节点数小于8个。则要根据链表上每个节点的哈希值，依次放入新哈希桶对应下标位置。
            else {
                //因为扩容是容量翻倍，所以原链表上的每个节点，现在可能存放在原来的下标，即low位，或者扩容后的下标，即high位。high位=low位+原哈希桶容量
                //低位链表的头结点、尾节点
                Node<K,V> loHead = null, loTail = null;
                //高位链表的头节点、尾节点
                Node<K,V> hiHead = null, hiTail = null;
                Node<K,V> next;//临时节点 存放e的下一个节点
                do {
                    next = e.next;
                　　//利用位运算代替常规运算：利用哈希值与旧的容量，可以得到哈希值去模后，是大于等于oldCap还是小于oldCap，等于0代表小于oldCap，应该存放在低位，否则存放在高位
                    if ((e.hash & oldCap) == 0) {
                        //给头尾节点指针赋值
                        if (loTail == null)
                            loHead = e;
                        else
                            loTail.next = e;
                        loTail = e;
                    }//高位也是相同的逻辑
                    else {
                        if (hiTail == null)
                            hiHead = e;
                        else
                            hiTail.next = e;
                        hiTail = e;
                        }//循环直到链表结束
                    } while ((e = next) != null);
                    //将低位链表存放在原index处
                    if (loTail != null) {
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    //将高位链表存放在新index处
                    if (hiTail != null) {
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    return newTab;
}
```




resize的操作主要涉及以下几步操作：

- 1. 如果到达最大容量，那么返回当前的桶，并不再进行扩容操作，否则的话扩容为原来的两倍，返回扩容后的桶；
- 2. 根据扩容后的桶，修改其他的成员变量的属性值；
- 3. 根据新的容量创建新的扩建后的桶，并更新桶的引用；
- 4. 如果原来的桶里面有元素就需要进行元素的转移；
- 5. 在进行元素转移的时候需要考虑到元素碰撞和转红黑树操作；
- 6. 在扩容的过程中，按次从原来的桶中取出链表头节点，并对该链表上的所有元素重新计算hash值进行分配；
- 7. 在发生碰撞的时候，将新加入的元素添加到末尾；
- 8. 在元素复制的时候需要同时对低位和高位进行操作。

 

## **四、成员方法**

### **put方法**：

 

```java
//向哈希表中添加元素
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}
```

 

向用户开放的put方法调用的是putVal方法：

putVal方法需要判断是否出现哈希冲突问题：

其中如果哈希值相等，key也相等，则是覆盖value操作；如果不是覆盖操作，则插入一个普通链表节点；

遍历到尾部，追加新节点到尾部；

在元素添加的过程中需要随时检查是否需要进行转换成红黑树的操作；



```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    //tab存放当前的哈希桶，p用作临时链表节点  
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    //如果当前哈希表是空的，代表是初始化
    if ((tab = table) == null || (n = tab.length) == 0)
    //那么直接去扩容哈希表，并且将扩容后的哈希桶长度赋值给n
    n = (tab = resize()).length;
    //如果当前index的节点是空的，表示没有发生哈希碰撞。直接构建一个新节点Node，挂载在index处即可。
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    else {//否则 发生了哈希冲突。
        Node<K,V> e; K k;
        //如果哈希值相等，key也相等，则是覆盖value操作
        if (p.hash == hash &&((k = p.key) == key || (key != null && key.equals(k))))
            e = p;//将当前节点引用赋值给e
        else if (p instance of TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        else {//不是覆盖操作，则插入一个普通链表节点
            //遍历链表
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {//遍历到尾部，追加新节点到尾部
                    p.next = newNode(hash, key, value, null);
                    //如果追加节点后，链表数量>=8，则转化为红黑树
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                    treeifyBin(tab, hash);
                    break;
                }
                //如果找到了要覆盖的节点
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                p = e;
            }
        }
        //如果e不是null，说明有需要覆盖的节点，
        if (e != null) { // existing mapping for key
            //则覆盖节点值，并返回原oldValue
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            //这是一个空实现的函数，用作LinkedHashMap重写使用。
            afterNodeAccess(e);
            return oldValue;
        }
    }
    //如果执行到了这里，说明插入了一个新的节点，所以会修改modCount，以及返回null。
    ++modCount;
    //更新size，并判断是否需要扩容。
    if (++size > threshold)
    resize();
    //这是一个空实现的函数，用作LinkedHashMap重写使用。
    afterNodeInsertion(evict);
    return null;
}
```



当存入的key是null的时候将调用putVal方法，看key不为null的情况。先调用了hash(int h)方法获取了一个hash值。

 “扰动函数”，这个方法的主要作用是防止质量较差的哈希函数带来过多的冲突（碰撞）问题。Java中int值占4个字节，即32位。根据这32位值进行移位、异或运算得到一个值。

那HashMap中最核心的部分就是哈希函数，又称散列函数。也就是说，哈希函数是通过把key的hash值映射到数组中的一个位置来进行访问。

hashCode右移16位，正好是32bit的一半。与自己本身做异或操作（相同为0，不同为1）。就是为了混合哈希值的高位和低位，增加低位的随机性。并且混合后的值也变相保持了高位的特征。

HashMap之所以不能保持元素的顺序有以下几点原因：

- 1. 插入元素的时候对元素进行哈希处理，不同元素分配到table的不同位置；
- 2. 容量拓展的时候又进行了hash处理；第三，复制原表内容的时候链表被倒置。
- 3. 复制原表内容的时候链表被倒置。

```java
//只做一次16位右位移异或混合：
static int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h=key.hashCode())^(h>>>16);
}
```

其中，key.hashCode（）是Key自带的hashCode()方法，返回一个int类型的散列值。我们大家知道，32位带符号的int表值范围从-2147483648到2147483648。这样只要hash函数松散的话，一般是很难发生碰撞的，因为HashMap的初始容量只有16。但是这样的散列值我们是不能直接拿来用的。用之前需要对数组的长度取模运算。得到余数才是索引值。

indexFor返回hash值和table数组长度减1的与运算结果。为什么使用的是length-1？因为这样可以保证结果的最大值是length-1，不会产生数组越界问题。

```java
static int indexFor(int h, int length) {
    return h & (length-1);
}
```

###  **get方法**

```java
public V get(Object key) {
    Node<K,V> e;
    //传入扰动后的哈希值 和 key 找到目标节点Node
    return (e = getNode(hash(key), key)) == null ? null : e.value; 
}
```

HashMap向用户分开放的get方法是调用的getNode方法来实现的，



```java
//传入扰动后的哈希值 和 key 找到目标节点Node
final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
    //查找过程，找到返回节点，否则返回null
    if ((tab = table) != null && (n = tab.length) > 0 && (first = tab[(n - 1) & hash]) != null) {
        if (first.hash == hash && ((k = first.key) == key || (key != null && key.equals(k))))
            return first;
        if ((e = first.next) != null) {
            if (first instanceof TreeNode)
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);
            do {
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}
```



查找的判断条件是：e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k)))，在比较hash值的同时需要比较key的值是否相同。

###  其他方法

　　1）contains

```java
　HashMap没有提供判断元素是否存在的方法，只提供了判断Key是否存在及Value是否存在的方法，分别是containsKey(Object key)、containsValue(Object value)。
containsKey(Object key)方法很简单，只是判断getNode (key)的结果是否为null，是则返回false，否返回true。
```



```java
public boolean containsKey(Object key) {
    return getNode(hash(key), key) != null; 
}
public boolean containsValue(Object value) {
    Node<K,V>[] tab; V v;
    //遍历哈希桶上的每一个链表
    if ((tab = table) != null && size > 0) {
        for (int i = 0; i < tab.length; ++i) {
            for (Node<K,V> e = tab[i]; e != null; e = e.next) {
            //如果找到value一致的返回true
            if ((v = e.value) == value || (value != null && value.equals(v)))
                return true;
            }
        }
    }
    return false; 
}
```



```java
判断一个value是否存在比判断key是否存在还要简单，就是遍历所有元素判断是否有相等的值。这里分为两种情况处理，value为null何不为null的情况，但内容差不多，只是判断相等的方式不同。这个判断是否存在必须遍历所有元素，是一个双重循环的过程，因此是比较耗时的操作。
2）remove方法
HashMap中“删除”相关的操作，有remove(Object key)和clear()两个方法。
其中向用户开放的remove方法调用的是removeNode方法，，removeNode (key)的返回结果应该是被移除的元素，如果不存在这个元素则返回为null。remove方法根据removeEntryKey返回的结果e是否为null返回null或e.value。
```



```java
public V remove(Object key) {
    Node<K,V> e;
    return (e = removeNode(hash(key), key, null, false, true)) == null ? null : e.value; 
}

final Node<K,V> removeNode(int hash, Object key, Object value, boolean matchValue, boolean movable) {
    // p 是待删除节点的前置节点
    Node<K,V>[] tab; Node<K,V> p; int n, index;
    //如果哈希表不为空，则根据hash值算出的index下 有节点的话。
    if ((tab = table) != null && (n = tab.length) > 0&&(p = tab[index = (n - 1) & hash]) != null) {
        //node是待删除节点
        Node<K,V> node = null, e; K k; V v;
        //如果链表头的就是需要删除的节点
        if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
            node = p;//将待删除节点引用赋给node
        else if ((e = p.next) != null) {//否则循环遍历 找到待删除节点，赋值给node
            if (p instanceof TreeNode)
                node = ((TreeNode<K,V>)p).getTreeNode(hash, key);
            else {
                do {
                    if (e.hash == hash && ((k = e.key) == key ||
                             (key != null && key.equals(k)))) {
                        node = e;
                        break;
                    }
                    p = e;
                } while ((e = e.next) != null);
            }
        }
        //如果有待删除节点node，  且 matchValue为false，或者值也相等
        if (node != null && (!matchValue || (v = node.value) == value ||
                                 (value != null && value.equals(v)))) {
            if (node instanceof TreeNode)
                ((TreeNode<K,V>)node).removeTreeNode(this, tab, movable);
            else if (node == p)//如果node == p，说明是链表头是待删除节点
                tab[index] = node.next;
            else//否则待删除节点在表中间
                p.next = node.next;
            ++modCount;//修改modCount
            --size;//修改size
            afterNodeRemoval(node);//LinkedHashMap回调函数
            return node;
        }
    }
    return null;
}
```



　　clear()方法删除HashMap中所有的元素，这里就不用一个个删除节点了，而是直接将table数组内容都置空，这样所有的链表都已经无法访问，Java的垃圾回收机制会去处理这些链表。table数组置空后修改size为0。





```java
public void clear() {
    Node<K,V>[] tab;
    modCount++;
    if ((tab = table) != null && size > 0) {
        size = 0;
        for (int i = 0; i < tab.length; ++i)
            tab[i] = null;
    }
}
```




## 五、树形化和红黑树的操作

 

可以看到无论是put，get还是remove方法中都有if (node instanceof TreeNode)方法来判断当前节点是否是一个树形化的节点，如果是的话就需要调用相应的红黑树的相关操作。

- 红黑树的成员变量的定义：

```java
TreeNode<K,V> parent;  // 父节点
TreeNode<K,V> left; //左节点
TreeNode<K,V> right; //右节点
TreeNode<K,V> prev;    // 在链表中的前一个节点
boolean red; //染红或者染黑标记
```

###  桶的树形化

　　桶的树形化 treeifyBin()，如果一个桶中的元素个数超过 TREEIFY_THRESHOLD(默认是 8 )，就使用红黑树来替换链表，从而提高速度。这个替换的方法叫 treeifyBin() 即树形化。



```java
//将桶内所有的 链表节点 替换成 红黑树节点
final void treeifyBin(Node<K,V>[] tab, int hash) {
    int n, index; Node<K,V> e;
    //如果当前哈希表为空，或者哈希表中元素的个数小于进行树形化的阈值(默认为 64)，就去新建/扩容
    if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
        resize();
    //如果哈希表中的元素个数超过了树形化阈值，进行树形化，e是哈希表中指定位置桶里的链表节点，从第一个开始
    else if ((e = tab[index = (n - 1) & hash]) != null) {
        //新建一个树形节点，内容和当前链表节点e一致
        TreeNode<K,V> hd = null, tl = null;
        do {
            TreeNode<K,V> p = replacementTreeNode(e, null);
            if (tl == null)
                hd = p;
            else {
                p.prev = tl;
                tl.next = p;
            }
            tl = p;
        } while ((e = e.next) != null);
        //让桶的第一个元素指向新建的红黑树头结点，以后这个桶里的元素就是红黑树而不是链表了
        if ((tab[index] = hd) != null)
            hd.treeify(tab);
    }
}
```



这段代码很简单，只是对桶里面的每个元素调用了replacementTreeNode方法将当前的节点变为一个树形节点来进行树形化：

```java
TreeNode<K,V> replacementTreeNode(Node<K,V> p, Node<K,V> next) {
    return new TreeNode<>(p.hash, p.key, p.value, next);
}
```

在所有的节点都替换成树形节点后需要让桶的第一个元素指向新建的红黑树头结点，以后这个桶里的元素就是红黑树而不是链表了，之前的操作并没有设置红黑树的颜色值，现在得到的只能算是个二叉树。在最后调用树形节点 hd.treeify(tab) 方法进行塑造红黑树，这是HashMap中个人认为第二个比较难的方法：



```java
final void treeify(Node<K,V>[] tab) {
    TreeNode<K,V> root = null;
    for (TreeNode<K,V> x = this, next; x != null; x = next) {
        next = (TreeNode<K,V>)x.next;
        x.left = x.right = null;
        if (root == null) { //第一次进入循环，确定头结点，为黑色
            x.parent = null;
            x.red = false;
            root = x;
        }
        else {  //后面进入循环走的逻辑，x 指向树中的某个节点
            K k = x.key;
            int h = x.hash;
            Class<?> kc = null;
            //又一个循环，从根节点开始，遍历所有节点跟当前节点 x 比较，调整位置，有点像冒泡排序
            for (TreeNode<K,V> p = root;;) {
                int dir, ph;        //这个 dir 
                K pk = p.key;
                if ((ph = p.hash) > h)  //当比较节点的哈希值比 x 大时，dir 为 -1
                    dir = -1;
                else if (ph < h)  //哈希值比 x 小时 dir 为 1
                    dir = 1;
                else if ((kc == null && (kc = comparableClassFor(k)) == null) ||(dir = compareComparables(kc, k, pk)) == 0)
                    // 如果比较节点的哈希值x 
                    dir = tieBreakOrder(k, pk);
                //把当前节点变成 x 的父亲
                //如果当前比较节点的哈希值比 x 大，x 就是左孩子，否则 x 是右孩子 
                TreeNode<K,V> xp = p;
                if ((p = (dir <= 0) ? p.left : p.right) == null) {
                    x.parent = xp;
                    if (dir <= 0)
                        xp.left = x;
                    else
                        xp.right = x;
                    //修正红黑树
                    root = balanceInsertion(root, x);
                    break;
                }
            }
        }
    }
    moveRootToFront(tab, root);
}
```



　　可以看到，将二叉树变为红黑树时，需要保证有序。这里有个双重循环，拿树中的所有节点和当前节点的哈希值进行对比(如果哈希值相等，就对比键，这里不用完全有序），然后根据比较结果确定在树种的位置。

### 红黑树的基本要求：

　　红黑树是一种近似平衡的二叉查找树，它能够确保任何一个节点的左右子树的高度差不会超过二者中较低那个的一倍。它不是严格控制左、右子树高度或节点数之差小于等于1，但红黑树高度依然是平均log(n)，且最坏情况高度不会超过2log(n)。红黑树是满足如下条件的二叉查找树（binary search tree）：

- 1. 每个节点要么是红色，要么是黑色。
- 2. 根节点必须是黑色
- 3. 红色节点不能连续（也即是，红色节点的孩子和父亲都不能是红色）。
- 4. 对于每个节点，从该点至`null`（树尾端）的任何路径，都含有相同个数的黑色节点。

上面的方法treeify涉及到的修正红黑树的方法balanceInsertion方法需要对树中节点进行重新的染色，这个函数也是红黑树树插入数据时需要调用的函数，其中涉及到的是左旋和右旋操作，这也是红黑树中两个主要的操作：



```java
static <K,V> TreeNode<K,V> balanceInsertion(TreeNode<K,V> root, TreeNode<K,V> x) {
    //插入的节点必须是红色的，除非是根节点
    x.red = true;
    //遍历到x节点为黑色,整个过程是一个上滤的过程
    xp=x.parent;xpp=xp.parent;xppl=xpp.left;xppr=xpp.right;
    for (TreeNode<K,V> xp, xpp, xppl, xppr;;) {
        if ((xp = x.parent) == null) {
            x.red = false;
            return x;
        }
        //如果xp是黑色就直接完成，最简单的情况
        else if (!xp.red || (xpp = xp.parent) == null)
            return root;
        //如果x的父节点是xp父节点的左节点
        if (xp == (xppl = xpp.left)) {
            //x的父亲节点的兄弟是红色的（需要颜色翻转）case1
            if ((xppr = xpp.right) != null && xppr.red) {
                xppr.red = false; //x父亲节点的兄弟节点置成黑色
                xp.red = false; //父亲和其兄弟节点一样是黑色
                xpp.red = true; //祖父节点置成红色
                x = xpp; //然后上滤（就是不断的重复上面的操作）
            }
            else {
                //如果x是xp的右节点整个要进行两次旋转,先左旋转再右旋转
                // case2
                if (x == xp.right) {
                    root = rotateLeft(root, x = xp);//左旋
                    xpp = (xp = x.parent) == null ? null : xp.parent;
                }
                //case3
                if (xp != null) {
                    xp.red = false;
                    if (xpp != null) {
                        xpp.red = true;
                        root = rotateRight(root, xpp);//右旋
                    }
                }
            }
        }
        //以左节点镜像对称
        else {
            if (xppl != null && xppl.red) {
                xppl.red = false;
                xp.red = false;
                xpp.red = true;
                x = xpp;
            }
            else {
                if (x == xp.left) {
                    root = rotateRight(root, x = xp);
                    xpp = (xp = x.parent) == null ? null : xp.parent;
                }
                if (xp != null) {
                    xp.red = false;
                    if (xpp != null) {
                        xpp.red = true;
                        root = rotateLeft(root, xpp);
                    }
                }
            }
        }
    }
}
```

左旋操作和右旋操作，拿出其中的代码：

```java
    //左旋转  
       static <K,V> TreeNode<K,V> rotateLeft(TreeNode<K,V> root, TreeNode<K,V> p) {  
           TreeNode<K,V> r, pp, rl;  
           if (p != null && (r = p.right) != null) {  
               if ((rl = p.right = r.left) != null)  
                   rl.parent = p;  
               if ((pp = r.parent = p.parent) == null)  
                   (root = r).red = false;  
               else if (pp.left == p)  
                   pp.left = r;  
               else  
                   pp.right = r;  
               r.left = p;  
               p.parent = r;  
           }  
           return root;  
       }  
  
       //右旋转  
       static <K,V> TreeNode<K,V> rotateRight(TreeNode<K,V> root, TreeNode<K,V> p) {  
           TreeNode<K,V> l, pp, lr;  
           if (p != null && (l = p.left) != null) {  
               if ((lr = p.left = l.right) != null)  
                   lr.parent = p;  
               if ((pp = l.parent = p.parent) == null)  
                   (root = l).red = false;  
               else if (pp.right == p)  
                   pp.right = l;  
               else  
                   pp.left = l;  
               l.right = p;  
               p.parent = l;  
           }  
           return root;  
       }
```



代码看上去比较绕，借用博客https://www.cnblogs.com/CarpenterLee/p/5503882.html中的图来解释：

###  左旋

左旋的过程是将`x`的右子树绕`x`逆时针旋转，使得`x`的右子树成为`x`的父亲，同时修改相关节点的引用。旋转之后，二叉查找树的属性仍然满足。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/post/sourcecode/hashmap1-1.png')" alt="wxmp">

###  右旋

右旋的过程是将`x`的左子树绕`x`顺时针旋转，使得`x`的左子树成为`x`的父亲，同时修改相关节点的引用。旋转之后，二叉查找树的属性仍然满足。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/post/sourcecode/hashmap1-2.png')" alt="wxmp">



针对HashMap的树形结构的插入，删除，查找操作也与数据结构中红黑树的操作是类似的，了解红黑树的操作也就了解了HashMap的树形结构的操作，balanceInsertion和左旋右旋的操作是上述HashMap的树形结构操作的关键。

## 参考文章
* https://www.cnblogs.com/winterfells/p/8876888.html