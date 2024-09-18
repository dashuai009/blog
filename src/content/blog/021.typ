#let date = datetime(
  year: 2022,
  month: 3,
  day: 14,
)
#metadata((
  "title": "康托展开及康托逆展开",
  "author": "dashuai009",
  description: "康托展开及康托逆展开",
  pubDate: "'Jul 08 2022'",
  subtitle: [math],
))<frontmatter>

#import "../__template/style.typ": conf
#show: conf


== 题目描述
<题目描述>
小 G 喜欢玩排列。现在他手头有两个 $n$ 的排列。$n$ 的排列是由
$0 , 1 , 2 , . . . , n - 1$这 n 的数字组成的。对于一个排列
$p$，$O r d e r (p)$ 表示 $p$ 是字典序第 $O r d e r (p)$ 小的

排列（从 0 开始计数）。对于小于 $n !$ 的非负数 $x$，$P e r m (x)$
表示字典序第 $x$ 小的排列。

现在，小 G 想求一下他手头两个排列的和。两个排列 $p$ 和 $q$ 的和为
$s u m = P e r m ((O r d e r (p) + O r d e r (q)) % n !)$

== 输入输出格式
<输入输出格式>
=== 输入格式：
<输入格式>
输入文件第一行一个数字 n，含义如题。

接下来两行，每行 n 个用空格隔开的数字，表示小 G 手头的两个排列。

=== 输出格式：
<输出格式>
输出一行 n 个数字，用空格隔开，表示两个排列的和

== 输入输出样例
<输入输出样例>
=== 输入样例\#1：
<输入样例1>
```
2
0 1
1 0
```
=== 输出样例\#1：
<输出样例1>
```
1 0
```
=== 输入样例\#2：
```
3
1 2 0
2 1 0
```
=== 输出样例\#2
```
1 0 2
```
== 说明
<说明>
1、2、3、4 测试点，$1 lt.eq n lt.eq 10$。

5、6、7 测试点，$1 lt.eq n lt.eq 5000$，保证第二个排列的
$O r d e r lt.eq 10^5$ 。

8、9、10 测试点，$1 lt.eq n lt.eq 5000$

== code


```cpp
#include <cstdio>
#include <cstring>
#include <cmath>
#include <cstdlib>
#include <iostream>
#include <algorithm>
using namespace std;

const int max_n = 5e4 + 10;
int cnt[max_n], p1[max_n], p2[max_n], pp1[max_n], pp2[max_n], ans[max_n];
int n;

inline int getnum()
{
    int ans = 0; char c; bool flag = false;
    while ((c = getchar()) == ' ' || c == '\n' || c == '\r');
    if (c == '-') flag = true; else ans = c - '0';
    while (isdigit(c = getchar())) ans = ans * 10 + c - '0';
    return ans * (flag ? -1 : 1);
}

int main()
{
    n = getnum();
    for (int i = n; i >= 1; i--) p1[i] = getnum();
    for (int i = n; i >= 1; i--) p2[i] = getnum();

    for (int i = 1; i <= n; i++)
        for (int j = 1; j < i; j++)
            if (p1[j] < p1[i]) pp1[i]++;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j < i; j++)
            if (p2[j] < p2[i]) pp2[i]++;

    for (int i = 2; i <= n; i++)
    {
        ans[i] += pp1[i] + pp2[i];
        ans[i + 1] += ans[i] / i;
        ans[i] %= i;
    }

    for (int i = n; i >= 1; i--)
    {
        int _ = -1;
        while (ans[i] >= 0)
        {
            _++;
            if (!cnt[_]) ans[i]--;
        }
        printf("%d ", _);
        cnt[_] = 1;
    }
}
```

== 康拓展开：
<康拓展开>
```cpp
const int PermSize = 12;
long long factory[PermSize] = { 1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800 };
long long Cantor(string buf) {
  int i, j, counted;
  long long result = 0;
  for (i = 0; i<PermSize; ++i) {
    counted = 0;
    for (j = i + 1; j<PermSize; ++j){
      if (buf[i]>buf[j])++counted;
    }
    result = result + counted*factory[PermSize - i - 1];
  }
  return result;
}
```

== 康托逆展开：
<康托逆展开>
```cpp
/*返回由前n个数[1, n]组成的全排列中第m大的排列。*/
vector<int> deCantor(int n, int m) {
    vector<int> res;
    long long buf = 0;
    m--;
    for(int f = 0; n > 0; n--) {
        f = m / facts[n - 1];
        m = m % facts[n - 1];
        while(buf & (1 << (f + 1)))f++;
        res.push_back(f + 1);
        buf |= (1 << (f + 1));
    }
    return res;
}
```