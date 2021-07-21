---
title: 交换排序—快速排序
---

::: tip
本文主要是介绍 交换排序—快速排序 。
:::

[[toc]]



## 交换排序—快速排序（Quick Sort）

------

### 基本思想：

1）选择一个基准元素,通常选择第一个元素或者最后一个元素,

2）通过一趟排序讲待排序的记录分割成独立的两部分，其中一部分记录的元素值均比基准元素值小。另一部分记录的 元素值比基准值大。

3）此时基准元素在其排好序后的正确位置

4）然后分别对这两部分记录用同样的方法继续进行排序，直到整个序列有序。

快速排序的示例：

（a）一趟排序的过程：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/sort/comm8/20191021120222301.png')" alt="wxmp">

（b）排序的全过程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/sort/comm8/20191021120234340.png')" alt="wxmp">

### 算法的实现：

 递归实现：

```cpp
void print(int a[], int n){
	for(int j= 0; j<n; j++){
		cout<<a[j] <<"  ";
	}
	cout<<endl;
}
 
void swap(int *a, int *b)
{
	int tmp = *a;
	*a = *b;
	*b = tmp;
}
 
int partition(int a[], int low, int high)
{
	int privotKey = a[low];								//基准元素
	while(low < high){								    //从表的两端交替地向中间扫描
		while(low < high  && a[high] >= privotKey) --high;  //从high 所指位置向前搜索，至多到low+1 位置。将比基准元素小的交换到低端
		swap(&a[low], &a[high]);
		while(low < high  && a[low] <= privotKey ) ++low;
		swap(&a[low], &a[high]);
	}
	print(a,10);
	return low;
}
 
 
void quickSort(int a[], int low, int high){
	if(low < high){
		int privotLoc = partition(a,  low,  high);  //将表一分为二
		quickSort(a,  low,  privotLoc -1);			//递归对低子表递归排序
		quickSort(a,   privotLoc + 1, high);		//递归对高子表递归排序
	}
}
 
int main(){
	int a[10] = {3,1,5,7,2,4,9,6,10,8};
	cout<<"初始值：";
	print(a,10);
	quickSort(a,0,9);
	cout<<"结果：";
	print(a,10);
 
}
```

 

### 分析：

快速排序是通常被认为在同数量级（O(nlog2n)）的排序方法中平均性能最好的。但若初始序列按关键码有序或基本有序时，快排序反而蜕化为冒泡排序。为改进之，通常以“三者取中法”来选取基准记录，即将排序区间的两个端点与中点三个记录关键码居中的调整为支点记录。快速排序是一个不稳定的排序方法。


### 快速排序的改进

在本改进算法中,只对长度大于k的子序列递归调用快速排序,让原序列基本有序，然后再对整个基本有序序列用插入排序算法排序。实践证明，改进后的算法时间复杂度有所降低，且当k取值为 8 左右时,改进算法的性能最佳。算法思想如下：

```cpp
void print(int a[], int n){
	for(int j= 0; j<n; j++){
		cout<<a[j] <<"  ";
	}
	cout<<endl;
}
 
void swap(int *a, int *b)
{
	int tmp = *a;
	*a = *b;
	*b = tmp;
}
 
int partition(int a[], int low, int high)
{
	int privotKey = a[low];					//基准元素
	while(low < high){					//从表的两端交替地向中间扫描
		while(low < high  && a[high] >= privotKey) --high; //从high 所指位置向前搜索，至多到low+1 位置。将比基准元素小的交换到低端
		swap(&a[low], &a[high]);
		while(low < high  && a[low] <= privotKey ) ++low;
		swap(&a[low], &a[high]);
	}
	print(a,10);
	return low;
}
 
 
void qsort_improve(int r[ ],int low,int high, int k){
	if( high -low > k ) { //长度大于k时递归, k为指定的数
		int pivot = partition(r, low, high); // 调用的Partition算法保持不变
		qsort_improve(r, low, pivot - 1,k);
		qsort_improve(r, pivot + 1, high,k);
	} 
} 
void quickSort(int r[], int n, int k){
	qsort_improve(r,0,n,k);//先调用改进算法Qsort使之基本有序
 
	//再用插入排序对基本有序序列排序
	for(int i=1; i<=n;i ++){
		int tmp = r[i]; 
		int j=i-1;
		while(tmp < r[j]){
			r[j+1]=r[j]; j=j-1; 
		}
		r[j+1] = tmp;
	} 
 
} 
 
 
 
int main(){
	int a[10] = {3,1,5,7,2,4,9,6,10,8};
	cout<<"初始值：";
	print(a,10);
	quickSort(a,9,4);
	cout<<"结果：";
	print(a,10);
 
}
```

 



## 参考文章
* https://blog.csdn.net/hguisu/article/details/7776068