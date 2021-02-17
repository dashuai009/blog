{
    "title": "2020ccpc_Weihai_D_ABC_Conjecture.md",
    "date": "2021-01-11 23:58:05",
    "tags": ["数论"]
}
....------....-

## [链接](https://codeforces.com/gym/102798/problem/D)

<!-- more -->

## 题意

Given a positive integer c, determine if there exists positive integers a, b, such that a + b = c and rad(abc) < c.

where
$$
rad(n)=\prod_{ p|n\ \&\&\ p\in Prime}p
$$
is the product of all distinct prime divisors of n.

## 数据范围
$1\leq T\leq 10,1\leq c\leq 10^{18}$

## 分析

- c=1
  输出`no`
- c的质因子的幂均为1,$\mu(c)=-1$
  输出`no`
- 否则，c的质因子中存在一个幂大于等于2的，输出`yes`
  $$
  \begin{aligned}
  &c=p^2k,a=pk,b=p(p-1)k\\
  &c+b=c\\
  &abc=p^4(p-1)k^3\\
  &rad(abc)=rad(p^4(p-1)k^3)=rad(p(p-1)k)\leq p(p-1)k <c\\
  \end{aligned}
  $$

以上，先筛掉c的$10^6$之内的质因子p，如果有输出`yes`;否则，$c=p^2k$中k只能为1，这样判断一下$\sqrt{c}$是不是素数即可。

## 代码

```c++
#include <bits/stdc++.h>
#define LL long long
const int N = 1e6 + 20;

LL prime[N];
bool bo[N];
int pcnt;

namespace MillerRabin {
long long Mul(long long a, long long b, long long mo) {
    long long tmp = a * b - (long long)((long double)a / mo * b + 1e-8) * mo;
    return (tmp % mo + mo) % mo;
}

long long Pow(long long a, long long b, long long mo) {
    long long res = 1;
    for (; b; b >>= 1, a = Mul(a, a, mo))
        if (b & 1)
            res = Mul(res, a, mo);
    return res;
}

bool IsPrime(long long n) {
    if (n == 2)
        return 1;
    if (n < 2 || !(n & 1))
        return 0;
    static const auto tester = {2, 3, 5, 7, 11, 13, 17, 19, 23};
    long long x = n - 1;
    int t = 0;
    for (; !(x & 1); x >>= 1)
        ++t;
    for (int p : tester) {
        long long a = p % (n - 1) + 1, res = Pow(a % n, x, n), last = res;
        for (int j = 1; j <= t; ++j) {
            res = Mul(res, res, n);
            if (res == 1 && last != 1 && last != n - 1)
                return 0;
            last = res;
        }
        if (res != 1)
            return 0;
    }
    return 1;
}
} // namespace MillerRabin

namespace PollardRho {
using namespace MillerRabin;
unsigned long long seed;

long long Rand(long long mo) { return (seed += 4179340454199820289ll) % mo; }

long long F(long long x, long long c, long long mo) {
    return (Mul(x, x, mo) + c) % mo;
}

long long gcd(long long a, long long b) { return b ? gcd(b, a % b) : a; }

long long Get(long long c, long long n) {
    long long x = Rand(n), y = F(x, c, n), p = n;
    for (; x != y && (p == n || p == 1);
         x = F(x, c, n), y = F(F(y, c, n), c, n))
        p = x > y ? gcd(n, x - y) : gcd(n, y - x);
    return p;
}

void Divide(long long n, long long p[]) {
    if (n < 2)
        return;
    if (IsPrime(n)) {
        p[++*p] = n;
        return;
    }
    for (;;) {
        long long tmp = Get(Rand(n - 1) + 1, n);
        if (tmp != 1 && tmp != n) {
            Divide(tmp, p);
            Divide(n / tmp, p);
            return;
        }
    }
}
} // namespace PollardRho
void makePrime() {
    for (int i = 2; i < N; ++i) {
        if (!bo[i]) {
            prime[++pcnt] = i;
        }
        for (int j = 1; j <= pcnt && i * prime[j] < N; ++j) {
            bo[i * prime[j]] = true;
            if (i % prime[j]) {
                break;
            }
        }
    }
}

int main() {
    makePrime();
    int T;
    std::cin >> T;
    while (T--) {
        LL c;
        std::cin >> c;
        if (c == 1) {
            std::cout << "no\n";
        } else {
            bool flag = false;
            for (int i = 1; i <= pcnt; ++i) {
                int cnt = 0;
                while (c % prime[i] == 0) {
                    ++cnt;
                    c /= prime[i];
                }
                if (cnt > 1) {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                std::cout << "yes\n";
            } else {
                long long p = sqrt(c);
                if (p * p == c && MillerRabin::IsPrime(p)) {
                    std::cout << "yes\n";
                } else {
                    std::cout << "no\n";
                }
            }
        }
    }
    return 0;
}
```