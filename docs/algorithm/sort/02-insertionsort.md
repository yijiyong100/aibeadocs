---
title: 插入排序—直接插入排序
---

::: tip
本文主要是介绍 插入排序—直接插入排序 。
:::

[[toc]]


## 插入排序—直接插入排序(Straight Insertion Sort)

------

### 基本思想:

将一个记录插入到已排序好的有序表中，从而得到一个新，记录数增1的有序表。即：先将序列的第1个记录看成是一个有序的子序列，然后从第2个记录逐个进行插入，直至整个序列有序为止。

要点：设立哨兵，作为临时存储和判断数组边界之用。

直接插入排序示例：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/sort/comm8/20191021115828228.png')" alt="wxmp">

 

如果碰见一个和插入元素相等的，那么插入元素把想插入的元素放在相等元素的后面。所以，相等元素的前后顺序没有改变，从原无序序列出去的顺序就是排好序后的顺序，***\*所以插入排序是稳定的。\****

### 算法的实现：

```cpp
void print(int a[], int n ,int i){
	cout<<i <<":";
	for(int j= 0; j<8; j++){
		cout<<a[j] <<" ";
	}
	cout<<endl;
}
 
 
void InsertSort(int a[], int n)
{
	for(int i= 1; i<n; i++){
		if(a[i] < a[i-1]){               //若第i个元素大于i-1元素，直接插入。小于的话，移动有序表后插入
			int j= i-1;	
			int x = a[i];		 //复制为哨兵，即存储待排序元素
			a[i] = a[i-1];           //先后移一个元素
			while(x < a[j]){	 //查找在有序表的插入位置
				a[j+1] = a[j];
				j--;		 //元素后移
			}
			a[j+1] = x;		 //插入到正确位置
		}
		print(a,n,i);			//打印每趟排序的结果
	}
	
}
 
int main(){
	int a[8] = {3,1,5,7,2,4,9,6};
	InsertSort(a,8);
	print(a,8,8);
}
```

 

### 效率：

 

时间复杂度：O（n^2）.

其他的插入排序有二分插入排序，2-路插入排序。

 


## 参考文章
* https://blog.csdn.net/hguisu/article/details/7776068