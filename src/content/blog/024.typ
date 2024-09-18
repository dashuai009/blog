
#let date = datetime(
  year: 2022,
  month: 3,
  day: 14,
)
#metadata((
  title: "陪审团人选",
  subtitle: [DP],
  author: "dashuai009",
  abstract: "",
  description: "poj上一道DP题。",
  pubDate: date.display(),
))<frontmatter>

#import "../__template/style.typ": conf
#show: conf


== Description
<description>
In Frobnia, a far-away country, the verdicts in court trials are
determined by a jury consisting of members of the general public. Every
time a trial is set to begin, a jury has to be selected, which is done
as follows. First, several people are drawn randomly from the public.
For each person in this pool, defence and prosecution assign a grade
from 0 to 20 indicating their preference for this person. 0 means total
dislike, 20 on the other hand means that this person is considered
ideally suited for the jury.

Based on the grades of the two parties, the judge selects the jury. In
order to ensure a fair trial, the tendencies of the jury to favour
either defence or prosecution should be as balanced as possible. The
jury therefore has to be chosen in a way that is satisfactory to both
parties.

We will now make this more precise: given a pool of n potential jurors
and two values di (the defence’s value) and pi (the prosecution’s value)
for each potential juror i, you are to select a jury of m persons. If J
is a subset of {1,…, n} with m elements, then D(J ) = sum(dk) k belong
to J and P(J) = sum(pk) k belong to J are the total values of this jury
for defence and prosecution.

For an optimal jury J , the value |D(J) - P(J)| must be minimal. If
there are several jurys with minimal |D(J) - P(J)|, one which maximizes
D(J) + P(J) should be selected since the jury should be as ideal as
possible for both parties.

You are to write a program that implements this jury selection process
and chooses an optimal jury given a set of candidates.

== Input
<input>
The input file contains several jury selection rounds. Each round starts
with a line containing two integers n and m. n is the number of
candidates and m the number of jury members.

These values will satisfy 1\<=n\<=200, 1\<=m\<=20 and of course
m\<=n.~The following n lines contain the two integers pi and di for i =
1,…,n.~A blank line separates each round from the next.

The file ends with a round that has n = m = 0.

== Output
<output>
For each round output a line containing the number of the jury selection
round ('Jury \#1', 'Jury \#2', etc.).

On the next line print the values D(J ) and P (J ) of your jury as shown
below and on another line print the numbers of the m chosen candidates
in ascending order. Output a blank before each individual candidate
number.

Output an empty line after each test case.

=== Sample Input
<sample-input>
#quote[
  4 2

  1 2

  2 3

  4 1

  6 2

  0 0
]

=== Sample Output
#quote[
  Jury \#1
]

Best jury has value 6 for prosecution and value 4 for defence: 2 3

== Hint
<hint>
If your solution is based on an inefficient algorithm, it may not
execute in the allotted time.

== Source
<source>
Southwestern European Regional Contest 1996

== 中文：
<中文>
描述

在遥远的国家佛罗布尼亚，嫌犯是否有罪，须由陪审团决定。陪审团是由法官从公众中挑选的。先随机挑选n个人作为陪审团的候选人，然后再从这n个人中选m人组成陪审团。选m人的办法是：

控方和辩方会根据对候选人的喜欢程度，给所有候选人打分，分值从0到20。为了公平起见，法官选出陪审团的原则是：选出的m个人，必须满足辩方总分和控方总分的差的绝对值最小。如果有多种选择方案的辩方总分和控方总分的之差的绝对值相同，那么选辩控双方总分之和最大的方案即可。

输入

输入包含多组数据。每组数据的第一行是两个整数n和m，n是候选人数目，m是陪审团人数。注意，$1 < = n < = 200 , 1 < = m < = 20 , m < = n$。接下来的n行，每行表示一个候选人的信息，它包含2个整数，先后是控方和辩方对该候选人的打分。候选人按出现的先后从1开始编号。两组有效数据之间以空行分隔。最后一组数据$n = m = 0$

输出

对每组数据，先输出一行，表示答案所属的组号,如 'Jury \#1', 'Jury \#2',
等。接下来的一行要象例子那样输出陪审团的控方总分和辩方总分。再下来一行要以升序输出陪审团里每个成员的编号，两个成员编号之间用空格分隔。每组输出数据须以一个空行结束。

样例输入

#quote[
  4 2

  1 2

  2 3

  4 1

  6 2

  0 0
]

样例输出

#quote[
  Jury \#1
]

Best jury has value 6 for prosecution and value 4 for defence: 2 3

为叙述问题方便，现将任一选择方案中，辩方总分和控方总分之差简称为“#strong[辩控差];”，辩方总分和控方总分之和称为“#strong[辩控和];”。第i个候选人的辩方总分和控方总分之差记为$V (i)$，辩方总分和控方总分之和记为$S (i)$。现用$f (j , k)$表示，取j个候选人，使其辩控差为k的所有方案中，辩控和最大的那个方案（该方案称为“方案$f (j , k)$”）的辩控和。并且，我们还规定，如果没法选j个人，使其辩控差为k，那么$f (j , k)$的值就为-1，也称方案$f (j , k)$不可行。本题是要求选出m个人，那么，如果对k的所有可能的取值，求出了所有的$f (m , k) (- 20 times m lt.eq k lt.eq 20 times m)$，那么陪审团方案自然就很容易找到了。

问题的关键是建立递推关系。需要从哪些已知条件出发，才能求出$f (j , k)$呢？显然，方案$f (j , k)$是由某个可行的方案$f (j - 1 , x) (- 20 times m lt.eq x lt.eq 20 times m)$演化而来的。可行方案$f (j - 1 , x)$能演化成方案$f (j , k)$的必要条件是：存在某个候选人i，i在方案$f (j - 1 , x)$中没有被选上，且$x + V (i) = k$。在所有满足该必要条件的$f (j - 1 , x)$中，选出$f (j - 1 , x) + S (i)$的值最大的那个，那么方案$f (j - 1 , x)$再加上候选人i，就演变成了方案$f (j , k)$。这中间需要将一个方案都选了哪些人都记录下来。不妨将方案$f (j , k)$中最后选的那个候选人的编号，记在二维数组的元素$p a t h [j] [k]$中。那么方案$f (j , k)$的倒数第二个人选的编号，就是$p a t h [j - 1] \[ k - V [p a t h [j] [k]]$。假定最后算出了解方案的辩控差是k，那么从$p a t h [m] [k]$出发，就能顺藤摸瓜一步步求出所有被选中的候选人。初始条件，只能确定$f (0 , 0) = 0$。由此出发，一步步自底向上递推，就能求出所有的可行方案$f (m , k) (- 20 times m lt.eq k lt.eq 20 times m)$。实际解题的时候，会用一个二维数组f来存放$f (j , k)$的值。而且，由于题目中辩控差的值k可以为负数，而程序中数租下标不能为负数，所以，在程序中不妨将辩控差的值都加上400，以免下标为负数导致出错，即题目描述中，如果辩控差为0，则在程序中辩控差为400。


```cpp
#include<stdio.h>
#include<stdlib.h>
#include<iostream>
#include<string.h>
usingnamespace std;
int f[30][1000];
//f[j,k]表示：取j个候选人，使其辩控差为k的方案中
//辩控和最大的那个方案（该方案称为“方案f(j,k)”)的控辩和
int Path[30][1000];
//Path数组用来记录选了哪些人
//方案f(j,k)中最后选的那个候选人的编号，记在Path[j][k]中
int P[300];//控方打分
int D[300]; //辩方打分

int Answer[30];//存放最终方案的人选

int cmp(constvoid*a,constvoid*b)
{
    return*(int*)a-*(int*)b;
}

int main()
{
   int i,j,k;
    int t1,t2;
    int n,m;
    int nMinP_D;//辩控双方总分一样时的辩控差
    int iCase;//测试数据编号
    iCase=0;
    while(scanf("%d %d",&n,&m))
    {
        if(n==0&&m==0)break;
        iCase++;
        for(i=1;i<=n;i++)
           scanf("%d %d",&P[i],&D[i]);
        memset(f,-1,sizeof(f));
        memset(Path,0,sizeof(Path));
        nMinP_D=m*20;//题目中的辩控差为0，对应于程序中的辩控差为m*20
        f[0][nMinP_D]=0;
        for(j=0;j<m;j++)//每次循环选出第j个人，共要选出m人
        {
            for(k=0;k<=nMinP_D*2;k++)//可能的辩控差为[0，nMinP_D*2]
            if(f[j][k]>=0)//方案f[j,k]可行
               {
                   for(i=1;i<=n;i++)
                       if(f[j][k]+P[i]+D[i]>f[j+1][k+P[i]-D[i]])
                       {
                           t1=j;t2=k;
                           while(t1>0&&Path[t1][t2]!=i)//验证i是否在前面出现过
                           {
                               t2-=P[Path[t1][t2]]-D[Path[t1][t2]];
                               t1--;
                           }
                           if(t1==0)
                           {
                               f[j+1][k+P[i]-D[i]]=f[j][k]+P[i]+D[i];
                               Path[j+1][k+P[i]-D[i]]=i;
                           }
                       }
               }
        }
        i=nMinP_D;
        j=0;
        while(f[m][i+j]<0&&f[m][i-j]<0)  j++;
        if(f[m][i+j]>f[m][i-j])  k=i+j;
        else k=i-j;
        printf("Jury #%d\n",iCase);
        printf("Best jury has value %d for prosecution and value %d for defence:\n",(k-nMinP_D+f[m][k])/2,(f[m][k]-k+nMinP_D)/2);
        for(i=1;i<=m;i++)
        {
            Answer[i]=Path[m-i+1][k];
            k-=P[Answer[i]]-D[Answer[i]];
        }
        qsort(Answer+1,m,sizeof(int),cmp);
        for(i=1;i<=m;i++)
          printf(" %d",Answer[i]);
        printf("\n\n");

    }
    return 0;
}
```
