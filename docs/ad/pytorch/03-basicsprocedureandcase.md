---
title: Pytorch-基本流程案例
---

::: tip
本文主要是介绍 Pytorch-基本流程案例 。
:::

[[toc]]

## Pytorch 基本流程

## pytorch in action

pytorch复现神经网络(深度学习)模型,一般包含如下三个步骤,本文对各个步骤给出可以参考的代码框架.

- 数据准备
- 构建模型
- 训练与评估

## 数据准备

- `train_data` (`train_data`, `valid_data`)
- `test_data`

### 构建自己的数据集

继承`DataSet`

```python
from torch.utils.data import Dataset, DataLoader

class SquareDataset(Dataset):
    def __init__(self, samples_num=10000):
        self.samples_num = samples_num
        self.X = [0.001 * i for i in range(samples_num)]
        self.Y = [0.001 * 2 * i for i in range(samples_num)]

    def __getitem__(self, idx):
        return self.X[idx], self.Y[idx]

    def __len__(self):
        return self.samples_num


square_dataset = SquareDataset(samples_num=10000)
training_iterator = DataLoader(square_dataset, batch_size=10, shuffle=True)
```

### 使用存在的数据集

导入相应的数据集,及相关处理方法

```python
import torchvision.transforms as transforms
from torch.utils.data import DataLoader

transform = transforms.Compose(
    [transforms.ToTensor(),
     transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))]
)

trainset = torchvision.datasets.CIFAR10(root='./data',
                                        train=True,
                                        download=True,
                                        transform=transform)
trainloader = DataLoader(trainset,
                         batch_size=4,
                         shuffle=True)
testset = torchvision.datasets.CIFAR10(root='./data',
                                       train=False,
                                       download=True,
                                       transform=transform)
testloader = DataLoader(testset,
                        batch_size=4,
                        shuffle=False)
```

- [A detailed example of how to generate your data in parallel with PyTorch](https://stanford.edu/~shervine/blog/pytorch-how-to-generate-data-parallel)

## 构建模型

继承特定的网络结构(RNN,LSTM)等

- 1. `__init__()`, 继承`nn.Module`,指定`Layer`的结构,计算每个`Layer`的参数维度.
- 2. `forward(x)`, 指明一个batch的输入数据`x`,流经网络的过程

### 卷积神经网络

```python
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()

        self.conv1 = nn.Conv2d(3, 6, 5)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(6, 16, 5)
        self.fc1 = nn.Linear(16 * 5 * 5, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x):
        # x = [N, 3, 32, 32]
        x = self.pool(F.relu(self.conv1(x)))
        # x = [N, 6, 14, 14]
        x = self.pool(F.relu(self.conv2(x)))
        # x = [N, 16, 5, 5]
        x = x.view(-1, 16 * 5 * 5)
        # x = [N, 16 * 5 * 5]
        x = F.relu(self.fc1(x))
        # x = [N, 120]
        x = F.relu(self.fc2(x))
        # x = [N, 84]
        x = self.fc3(x)
        # x = [N, 10]
        return x
```

### 循环神经网络

```python
class RNN(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, output_dim, n_layers, bidirectional, dropout):
        super().__init__()
        
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.rnn = nn.LSTM(embedding_dim, hidden_dim, num_layers=n_layers, bidirectional=bidirectional, dropout=dropout)
        self.fc = nn.Linear(hidden_dim*2, output_dim)
        self.dropout = nn.Dropout(dropout)
        
    def forward(self, x):
        #x = [sent len, batch size]
        embedded = self.dropout(self.embedding(x))
        #embedded = [sent len, batch size, emb dim]
        output, (hidden, cell) = self.rnn(embedded)
        #output = [sent len, batch size, hid dim * num directions]
        #hidden = [num layers * num directions, batch size, hid dim]
        #cell = [num layers * num directions, batch size, hid dim]
        
        #concat the final forward (hidden[-2,:,:]) and backward (hidden[-1,:,:]) hidden layers
        #and apply dropout
        hidden = self.dropout(torch.cat((hidden[-2,:,:], hidden[-1,:,:]), dim=1))
        #hidden = [batch size, hid dim * num directions]
        return self.fc(hidden.squeeze(0))
```

## 训练与评估

### 定义网络,损失函数,参数优化方法

```python
# 设定参数,定义网络
input_dim = ...
embedding_dim = ...

model = RNN(input_dim, embedding_dim, ...)

# 定义损失函数,参数优化方法
import torch.optim as optim

criterion = nn.BCEWithLogitsLoss()
optimizer = optim.Adam(model.parameters())

# 送入设定的设备中
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)
criterion = criterion.to(device)
```

### 训练epoch

记录loss值

```python
def train_epoch(epoch, iterator):
    # 记录近期的损失函数值,判断训练效果
    running_loss = 0.0
    # train()模式,打开dropout和batch normalization
    model.train()
    # 遍历数据集
    for i, (inputs, labels) in enumerate(iterator, 0):
        # pytorch梯度会自动累加,需要手动清空上次计算的梯度
        optimizer.zero_grad()
        # 给定输入,计算模型输出
        outputs = model(inputs)
        # 计算损失函数值
        loss = criterion(outputs, labels)
        # 计算参数梯度
        loss.backward()
        # 使用参数梯度更新权重
        optimizer.step()
        # 每2000次迭代,输出当前状态
        running_loss += loss.item()
        if i % 2000 == 1999:
            print('[%d, %5d] loss: %.3f'
                  % (epoch+1, i+1, running_loss / 2000))
            running_loss = 0.0
```

### 评估epoch

评估准确率

```python
def evaluate_epoch(epoch, iterator):
    correct = 0
    total = 0
    # eval()模式,关闭dropout和batch normalization
    model.eval()
    with torch.no_grad():
        for inputs, labels in iterator:
            outputs = model(inputs)
            correct += (outputs == labels).sum().item()
            total += labels.size(0)
    print('[%d, %d %%] acc' % (epoch, 100 * correct / total))
```

### 运行

```python
n_epoches = 10

for epoch in range(n_epoches):
    train_epoch(epoch, trainloader)
    # 如果没有validloader,可以直接是testloader
    evaluate_epoch(epoch, validloader)

# 如果有validloader,测试集最后进行测试
evaluate_epoch(-1, testloader)
```



## 【----------------------------】


## PyTorch 代码流程（简单例子）


## 一、模型构建

这个写成了类，一般要继承torch.nn.Module来定义网络结构，然后再通过forward()定义前向过程。

下面以一个很简单的两层全连接网络为例：

```python
# net
class net(nn.Module):
  def __init__(self):
    super(net, self).__init__() 
    self.fc1 = nn.Linear(50, 50)
    self.fc2 = nn.Linear(50, 10)
  def forward(self, x):
    fc1 = self.fc1(x)
    fc2 = self.fc2(fc1)
    return fc2
 
# model
net = net()
```

其中，**super**这个关键字主要是用于调用父类的方法，它可以防止对父类的多次调用，相当于产生了一个super类的对象。

## 二、数据处理

数据处理一般是用官方给的Dataset抽象类，根据数据的特点处理。也可不用官方的类，自行处理数据。还有可能是用现成的数据集。

这里是一个txt文件保存了图片路径与单个标签的例子：

```python
from PIL import Image
from torch.utils.data import Dataset
class trainDataset(Dataset):
    def __init__(self, txt_path, transform=None, target_transform=None):
        fh = open(txt_path, 'r')
        imgs = []
        for line in fh:
            line = line.rstrip()
            words = line.split()
            imgs.append((words[0].int(words[1]))) # 图片路径+label
        self.imgs = imgs
        self.transform = transform        
 
    def __getitem__(self, index):
        fn, label = self.imgs[index]
        img = Image.open(fn).convert('RGB')
        if self.transform is not None:
            img = self.transform(img)
        return img, label
 
    def __len__(self):
        return len(self.imgs)
```

然后加载训练数据集与验证集，同时可以实现取batch，shuffle或者多线程读取数据，这里是最简单的版本：

```python
# data
train_data = torch.utils.data.DataLoader(trainDataset)
val_data = torch.utils.data.DataLoader(valDataset)
```

当然还可以加上一些数据增强的方法。

## 三、定义Loss和optimizer

```python
# loss
loss = torch.nn.CrossEntropyloss()
loss = torch.nn.MSELoss()
# optimizer
optimizer = torch.optim.Adam(net.parameters())
```

## 四、构建训练过程

以一个epoch的训练为例：

```python
def train(epoch):
    for i, data in enumerate(dataLoader, 0):
        x, y = data
        y_pred = model(x)
 
        # loss compute
        loss = criterion(y_pred, y)
        optimizer.zero_grad()  # pytorch梯度会自动累加，反向传播之前需要将梯度清零
        loss.backward()
        optimizer.step()
```



## 参考文章
* https://blog.csdn.net/benbenls/article/details/102691378
* https://blog.csdn.net/Treasureashes/article/details/118977418