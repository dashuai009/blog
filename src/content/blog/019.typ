#let date = datetime(
  year: 2022,
  month: 3,
  day: 14,
)
#metadata((
  "title": "文本分类",
  "author": "dashuai009",
  description: "bupt-人工智能课大作业",
  pubDate: "'Jul 08 2022'",
  subtitle: [人工智能,文本分类],
))<frontmatter>

#import "../__template/style.typ": conf
#show: conf



== 1. 实验目的
<实验目的>
- 掌握数据预处理的方法，对训练集数据进行预处理；
- 掌握文本建模的方法，对语料库的文档进行建模；
- 掌握分类算法的原理，基于有监督的机器学习方法，训练文本分类器；
- 利用学习的文本分类器，对未知文本进行分类判别；
- 掌握评价分类器性能的评估方法。

== 2. 实验类型
<实验类型>
数据挖掘算法的设计与编程实现。

== 3. 实验要求
<实验要求>
- 文本类别数：\>=10类；
- 训练集文档数：\>=50000篇；每类平均5000篇。
- 测试集文档数：\>=50000篇；每类平均5000篇。

== 4. 实验内容
<实验内容>
利用分类算法实现对文本的数据挖掘，主要包括：
- 语料库的构建，主要包括利用爬虫收集Web文档等；
- 语料库的数据预处理，包括文档建模，如去噪，分词，建立数据字典，使用词袋模型或主题模型表达文档等；
- 选择分类算法（朴素贝叶斯（必做）、SVM/其他#strike[#strong[实际验收有几个不做的？];];等），训练文本分类器，理解所选的分类算法的建模原理、实现过程和相关参数的含义；
- 对测试集的文本进行分类
- 对测试集的分类结果利用正确率和召回率进行分析评价：计算每类正确率、召回率，计算总体正确率和召回率。

== 5. 实验准备
<实验准备>
=== 5.1. 实验环境
<实验环境>
#strong[fedora 33]

个人比较喜欢linux环境，windows环境应该也可以完成下面的步骤。一些文件路径可能会修改。
另外，硬盘读取速度等都会影响实验结果（速度等方面）。

=== 数据集准备

#link("http://thuctc.thunlp.org/message")[THUCNews]

数据集大小：1.45GB

样本数量：80多万

数据集详情链接：#link("http://thuctc.thunlp.org")[thuctc]

在解压出的目录下新建两个文件夹`trainData`和`testData`。
注意：Linux下解压会多一层目录并多一个`__MACOSX`，这个并不影响实验。

解压结果如下

#figure(
  image("019/thu.png", width: 200pt),
  caption: [
    文本分类实验 解压结果
  ],
)

=== cppjieba
<cppjieba>
#link("https://github.com/yanyiwu/cppjieba")[cppjieba];是”结巴(Jieba)“中文分词的C++版本。
这个要比python快10倍，解决本实验足够好用!

用法
- 依赖软件

\> `g++ (version >= 4.1 is recommended) or clang++;`

\>

\> `cmake (version >= 2.6 is recommended);`
- 下载和编译
\>
`git clone --depth=10 --branch=master git://github.com/yanyiwu/cppjieba.git`
\> \> `cd cppjieba`
\> \> `mkdir build` \> \> `cd build` \> \>
`cmake ..` \> \> `make`

结果如下

#figure(
  image("019/jieba.png", width: 200pt),
  caption: [
    文本分类实验
  ],
)

我们只需要修改`cppjieba\test\demo.cpp}`，
但我们要在`cppjieba\build`下执行`make`进行编译，
并执行`./demo`运行分词程序。

=== 朴素贝叶斯分类器
<朴素贝叶斯分类器>
贝叶斯方法的分类目标是在给定描述实例的属性值
$< a_1 , a_2 , . . . , a_n >$下，得到最可能的目标值$V_(M A P)$。

$
  v_(M A P) & = a r g max_(v_j) P (v_j \| a_1 , a_2 , . . . , a_n)\
  & = a r g max_(v_j in V) frac(P (a_1 , a_2 , . . . , a_n) P (v_j), P (a_1 , a_2 , . . . , a_n))\
  & = a r g max_(v_j in V) P (a_1 , a_2 , . . . , a_n) P (v_j)\
  & = a r g max_(v_j in V) P (v_j) product_i P (a_i \| v_j)
$

采纳m-估计方法，即有统一的先验概率并且m等于词汇表的 大小，因此
$ P (w_k \| v_j) = frac(v_k + 1, n + lr(|V o c a b u l a r y|)) $

定义如下函数：

`Learn_Naive_Bayes_Text( Examples, V )`

Examples为一组文本文档以及它们的目标值。V为所有可能目标值的集合。此函数作用是学
习概率项$P (w_k \| v_j)$和$P (v_j)$。

```cpp
收集Examples中所有的单词、标点符号以及其他记号

Vocabulary <= 在Examples中任意文本文档中出现的所有单词及记号的集合
    计算所需要的概率项$P(vj)$和$P(wk|vj)$
        对V中每个目标值vj
            $docs_j\leftarrow$Examples中目标值为$v_j$的文档子集
            $P(v_j)\leftarrow|docs_j| / |Examples|$
            $Text_j\leftarrow$将$docs_j$中所有成员连接起来建立的单个文档
            $n\leftarrow$在$Text_j$中不同单词位置的总数
            对Vocabulary中每个单词$w_k$
                $n_k\leftarrow$单词$w_k$出现在$Text_j$中的次数
                $P(w_k|v_j)\leftarrow(n_k+1) / (n+|Vocabulary|)$
```

== $chi^2$检验
<chi2检验>
$ chi^2 (t , c) = frac(N (A D - B C)^2, (A + B) (A + C) (C + D) (B + D)) $

=== svm
<svm>
下载地址：#link("http://www.csie.ntu.edu.tw/~cjlin/cgi-bin/libsvm.cgi?+http://www.csie.ntu.edu.tw/~cjlin/libsvm+tar.gz")[libsvm]

之后`make`一下，就会用三个可执行文件，`svm-scale  svm-train  svm-train`。
分别是数据整理，模型训练和数据预测。

具体参数可以直接输入`./svm-scale`获得。

更多内容可以自行百度。

== 代码实现
<代码实现>
总共分为五个部分

```cpp
trainingData();
makeDict();
makeSvm();
testingData();
printAns();
```

=== 变量声明
<变量声明>
```cpp
#define MYMODE_RW (S_IRUSR | S_IWUSR)
using namespace std;

const char *const DICT_PATH = "../dict/jieba.dict.utf8";
const char *const HMM_PATH = "../dict/hmm_model.utf8";
const char *const USER_DICT_PATH = "../dict/user.dict.utf8";
const char *const IDF_PATH = "../dict/idf.utf8";
const char *const STOP_WORD_PATH = "../dict/stop_words.utf8";

const string dataSet = "../../THUCNews/THUCNews/";
// const string dataSet = "../../THUCNews/";
const string svmTrainData = "../../THUCNews/trainData/";
const string svmTestData = "../../THUCNews/testData/";

const int MAXS = 8e6 + 10;  //文件大小限制

//Vtot 总的类别数量
//maxCommon取相关性的前200的词组成词袋
//testCnt每个类别如果有2*testCnt篇文章，
//就取testCnt篇作为测试数据，
//再取testCnt篇作为训练数据

const int Vtot = 11, maxCommon = 200, testCnt = 5000;


//所有种类
string V[Vtot] = {"体育", "娱乐", "家居", "彩票", "房产", "教育",
                  "时政", "游戏", "社会", "科技", "财经"};

//dic[i]第i类文章中出现的所有词
map<string, int> dic[Vtot + 1];

//p[i][word] p(word|vj=i)
//第i类文章中，word出现的概率，做平滑处理
map<string, int> p[Vtot];

//kappa[i][word] word和第i类文章的kappa^2值
map<string, int> kappa[Vtot + 1];

//在处理svm数据集时，每个单词的编号
map<string, int> svmIndex;

//idf值
map<string, double> idf;

//fileList[i]第i类文章列表
vector<string> fileList[Vtot];

//混淆矩阵
int confusionMatrix[Vtot][Vtot];
int docs[Vtot + 1];  // docs[i]:第i类文章训练或测试的数目

int n[Vtot + 1];     // n[i]:第i类有多少个单词（有重复）

int precision[Vtot], recall[Vtot];  //准确率和回归率

//多线程id
long unsigned int thrd[Vtot];


#define dictAll dic[Vtot]

//结巴分词器
cppjieba::Jieba jieba(DICT_PATH, HMM_PATH, USER_DICT_PATH, IDF_PATH,
                      STOP_WORD_PATH);
```

=== {训练数据部分}
<训练数据部分>
下面是处理数据的多线程函数

```cpp
/**
 * 多线程函数
 * 处理数据
 * 读入文件->分词->计算dic[type]->计算kappa[type]
 */
void *trainingData(void *t) {
    int type = (long long)t;
    auto &dict = dic[type];
    auto &kap = kappa[type];
    char sentence[MAXS];
    for (int d = 0; d < docs[type]; ++d) {

        //读入文件
        string fileName = dataSet + V[type] + "/" + fileList[type][d];
        int fd = open(fileName.c_str(), O_RDONLY);
        int len = pread(fd, sentence, MAXS, 0);
        close(fd);
        //如果文件大小超出MAXS会出错
        if (len < 0) continue;
        sentence[len] = '\0';
        vector<pair<string, string>> tagres;
        //分词
        jieba.Tag(sentence, tagres);

        //计算dic[type]->计算kappa[type]
        set<string> thisArticle;//本篇文章单词集合
        for (auto it : tagres) {
            const auto &word = it.first;  //单词
            if (strstr(it.second.c_str(), "n") != NULL &&
                word.length() > 2) {  //名词 且 长度大于一
                dict.find(word) != dict.end() ? dict[word]++ : dict[word] = 1;
                thisArticle.insert(word);
            }
        }
        for (auto it : thisArticle) {
            kap.find(it) != kap.end() ? kap[it]++ : kap[it] = 1;
        }
    }
    cout << V[type] << "\tDone\n";
    return NULL;
}
```

想要调用上面的线程函数，需要先读取文件列表，如下：

```cpp
//读取文件列表
void readFileLists(string dir, vector<string> &fileList) {
    // cout<<dir<<'\n';
    DIR *d = opendir(dir.c_str());
    struct dirent *entry;
    while ((entry = readdir(d)) != NULL) {
        if (strstr(entry->d_name, ".txt") != NULL)
            fileList.push_back(entry->d_name);
    }
    closedir(d);
}
//读取文件列表并处理训练数据
void trainingData() {
    for (int i = 0; i < Vtot; ++i) {
        readFileLists(dataSet + V[i], fileList[i]);
    }

    for (int i = 0; i < Vtot; ++i) {
        docs[i] = min(int(fileList[i].size()) / 2, testCnt);
        // testCnt方便测试

        cout << V[i] << " 类的文件个数为 " << docs[i] << '\n';

        docs[Vtot] += docs[i];
        int res = pthread_create(&thrd[i], NULL, trainingData, (void *)i);
        if (res) {
            printf("Create thress NO.%d failed\n", i);
            exit(res);
        }
    }
    for (int i = 0; i < Vtot; ++i) {
        pthread_join(thrd[i], NULL);
    }
}
```

=== 生成字典部分
<生成字典部分>
```cpp
//抽取词典，使用kappa^2检验
void makeDict() {
    for (int i = 0; i < Vtot; ++i) {
        vector<pair<double, string>> mostCommon;
        for (auto it : kappa[i]) {
            double A = 0, B = 0, C = 0, D = 0;
            A = it.second;
            C = docs[i] - A;
            const auto &word = it.first;
            for (int j = 0; j < Vtot; ++j)
                if (i != j) {
                    if (kappa[j].find(word) != kappa[j].end()) {
                        B += kappa[j][word];
                    }
                }
            D = docs[Vtot] - docs[i] - B;
            double k = docs[Vtot] * (A * D - B * C) * (A * D - B * C) /
                       ((A + C) * (A + B) * (B + D) * (C + D));
            mostCommon.push_back({k, word});
        }
        sort(mostCommon.begin(), mostCommon.end());

        reverse(mostCommon.begin(), mostCommon.end());
        int item = 0;

        cout << V[i] << ':';

        for (auto it : mostCommon) {
            ++item;
            if (item > maxCommon) break;
            const auto &word = it.second;
            const int cnt = dic[i][word];
            n[i] += cnt;
            dictAll.find(word) != dictAll.end() ? dictAll[word] += cnt
                                                : dictAll[word] = cnt;
        }
        cout << V[i] << "单词个数" << n[i] << '\n';
        n[Vtot] += n[i];

        /*for (int j = max(0, (int)mostCommon.size() - 20);
             j < (int)mostCommon.size(); ++j) {
            cout << "(" << mostCommon[j].first << ' ' << mostCommon[j].second
                 << ") ";
        }
        cout << '\n';*/
    }
}
```

=== 生成svm的训练数据文件和测试数据文件
<生成svm的训练数据文件和测试数据文件>
```cpp

/**
 * 多线程函数
 * 整理svm用到的数据文件
 * 包括测试文件和输出文件
 * 要按照libsvm要求的数据格式来
 */

void *svmData(void *t) {
    int type = (long long)t;
    //先打开训练数据文件
    int fdout = open((svmTrainData + V[type]).c_str(), O_RDWR | O_CREAT, MYMODE_RW);
    if (fdout == -1) {
        cout << errno << '\n';
        perror("open");
    }
    auto &dict = dic[type];
    auto &kap = kappa[type];
    string outBuf;
    char sentence[MAXS];
    int fdoffset = 0;

    for (int d = 0; d < (int)fileList[type].size() && d < 2 * docs[type]; ++d) {
        if (d == docs[type]) {  //这之后是测试数据集
            close(fdout);
            fdout = open((svmTestData + V[type]).c_str(), O_RDWR | O_CREAT, MYMODE_RW);
            fdoffset = 0;
            if (fdout == -1) {
                cout << errno << '\n';
                perror("open");
            }
        }

        //读取文件并进行分词
        string fileName = dataSet + V[type] + "/" + fileList[type][d];
        int fd = open(fileName.c_str(), O_RDONLY);
        long long int len = pread(fd, sentence, MAXS, 0);
        close(fd);
        if (len < 0) continue;  //如果文件大小超出MAXS会出错
        sentence[len] = '\0';
        // cout << sentence << '\n';
        vector<pair<string, string>> tagres;
        jieba.Tag(sentence, tagres);

        //统计这篇文章中的词频
        map<string, int> art;
        int totArt = 0;
        for (auto it : tagres) {
            const auto &word = it.first;  //单词
            if (dictAll.find(word) != dictAll.end()) {
                art.find(word) != art.end() ? art[word]++ : art[word] = 1;
                totArt++;
            }
        }

        outBuf = to_string(type) + " ";

        for (auto it : art) {
            auto &word = it.first;
            double tf = it.second * 1.0 / totArt;  // tf-idf=tf*idf
            outBuf += to_string(svmIndex[word]) + ":" +
                      to_string(tf * idf[word]) + " ";
        }
        outBuf += '\n';
        pwrite(fdout, outBuf.c_str(), outBuf.length(), fdoffset);
        fdoffset += outBuf.length();
    }
    close(fdout);
    return NULL;
}
/**
 * 处理svm用到的数据
 */
void makeSvm() {
    //对单词进行编号，并计算idf值
    int item = 0;
    for (auto it : dictAll) {
        auto &word = it.first;
        svmIndex[word] = ++item;
        for (int i = 0; i < Vtot; ++i) {
            if (kappa[i].find(word) != kappa[i].end()) {
                idf.find(word) != idf.end() ? idf[word] += kappa[i][word]
                                            : idf[word] = kappa[i][word];
            }
        }
    }
    for (auto &it : idf) {
        it.second = log10(docs[Vtot] * 2 / (it.second + 1));
    }

    //多线程处理数据，每个线程处理一个类别的数据
    for (int i = 0; i < Vtot; ++i) {
        int res = pthread_create(&thrd[i], NULL, svmData, (void *)i);
        if (res) {
            printf("Create thress NO.%d failed\n", i);
            exit(res);
        }
    }
    for (int i = 0; i < Vtot; ++i) {
        pthread_join(thrd[i], NULL);
    }

    //处理完成之后，将所有类别的数据合到一起
    char buf[MAXS];
    int fdout =
        open((svmTrainData + "trainData.txt").c_str(), O_RDWR | O_CREAT, MYMODE_RW);
    if (fdout == -1) {
        cout << errno << '\n';
        perror("open");
    }

    off_t off = 0;
    for (int i = 0; i < Vtot; ++i) {
        int fd = open((svmTrainData + V[i]).c_str(), O_RDONLY);
        int len = pread(fd, buf, MAXS, 0);
        close(fd);
        if (len < 0) continue;
        buf[len] = '\0';
        pwrite(fdout, buf, strlen(buf), off);
        cout << strlen(buf) << '\n';
        off += strlen(buf);
        cout << V[i] << ' ' << strlen(buf) << ' ' << off << '\n';
    }
    close(fdout);

    fdout = open((svmTestData + "testData.txt").c_str(), O_RDWR | O_CREAT, MYMODE_RW);
    off = 0;
    for (int i = 0; i < Vtot; ++i) {
        int fd = open((svmTestData + V[i]).c_str(), O_RDONLY);
        int len = pread(fd, buf, MAXS, 0);
        close(fd);
        if (len < 0) continue;
        buf[len] = '\0';
        pwrite(fdout, buf, strlen(buf), off);
        off += strlen(buf);
        cout << V[i] << ' ' << strlen(buf) << ' ' << off << '\n';
    }
    close(fdout);
}
```

=== 进行文本分类
<进行文本分类>
先预处理出p的值，

```cpp
/**
 * 朴素贝叶斯分类器
 */
void *bayes(void *t) {
    int type = (long long)t;
    cout << "classfiying " << V[type] << "\n";
    char sentence[MAXS];

    for (int f = docs[type]; f < (int)fileList[type].size(); ++f) {
        if (f - docs[type] > docs[type]) break;

        //读取文件
        string fileName = dataSet + V[type] + "/" + fileList[type][f];
        int fd = open(fileName.c_str(), O_RDONLY);
        int len = pread(fd, sentence, MAXS, 0);
        close(fd);
        //分词
        if (len < 0) continue;  //读入出错，buf不够之类的
        sentence[len] = '\0';
        vector<pair<string, string>> tagres;
        jieba.Tag(string(sentence), tagres);

        //计算argmax(p)
        pair<double, int> ans[Vtot];
        for (int i = 0; i < Vtot; ++i) {
            ans[i] = {docs[i] * 1.0 / docs[Vtot], i};
        }
        for (auto it : tagres) {
            if (dictAll.find(it.first) != dictAll.end()) {
                for (int i = 0; i < Vtot; ++i) {
                    ans[i].first += p[i][it.first];
                }
            }
        }
        sort(ans, ans + Vtot);
        confusionMatrix[type][ans[Vtot - 1].second] += 1;
    }
    cout << "classfiy " << V[type] << "\tdone\n";
    return NULL;
}

//训练数据
void testingData() {

    //预处理p[i][word]值
    cout << "字典长度=" << dictAll.size() << '\n';
    for (int vj = 0; vj < Vtot; ++vj) {
        for (auto it : dictAll) {
            const auto &word = it.first;
            if (dic[vj].find(word) != dic[vj].end()) {
                p[vj][word] =
                    log10(dic[vj][word] + 1) - log10(n[vj] + dictAll.size());
            } else {
                p[vj][word] = log10(1) - log10(n[vj] + dictAll.size());
            }
        }
    }

    //多线程进行文本分类
    for (int i = 0; i < Vtot; ++i) {
        int res = pthread_create(&thrd[i], NULL, bayes, (void *)i);
        if (res) {
            printf("Create thress NO.%d failed\n", i);
            exit(res);
        }
    }
    for (int i = 0; i < Vtot; ++i) {
        pthread_join(thrd[i], NULL);
    }
}
```

=== 输出结果
<输出结果>
```cpp
//输出想要的答案
void printAns() {
    double avrPre = 0, avrRecall = 0;
    for (int v1 = 0; v1 < Vtot; ++v1) {
        cout << V[v1] << ":\t";
        for (int v2 = 0; v2 < Vtot; ++v2) {
            precision[v2] += confusionMatrix[v1][v2];
            recall[v1] += confusionMatrix[v1][v2];
            cout << confusionMatrix[v1][v2] << '\t';
        }
        cout << '\n';
    }
    for (int v = 0; v < Vtot; ++v) {
        cout << V[v] << '\n';
        cout << "准确率=" << confusionMatrix[v][v] * 100.0 / precision[v]
             << "% ";
        avrPre += confusionMatrix[v][v] * 100.0 / precision[v];
        cout << "召回率=" << confusionMatrix[v][v] * 100.0 / recall[v] << "%\n";
        avrRecall += confusionMatrix[v][v] * 100.0 / recall[v];
    }
    cout << "平均准确率=" << avrRecall / Vtot << "% "
         << "平均召回率=" << avrRecall / Vtot << "\n";
}
```

== 实验结果
<实验结果>
先输出训练的文件个数，训练完成之后，统计每个类别有多少单词。
之后，得出字典长度为2037。

#figure(
  image("019/ans1.png", width: 300pt),
  caption: [
    结果
  ],
)

预测完成之后是混淆矩阵。

#figure(
  image("019/ans2.png"),
  caption: [
    文本分类实验 混淆矩阵
  ],
)

输出召回率和准确率，最后输出运行时间。
#strong[可以看到最后运行时间仅为12秒，这就是c++的长处之一。]
总共分析了55000篇文章，从读入到分词，到其他计算。总共执行时间非常短。
相比于python的10min左右要好得多。

#figure(
  image("019/ans3.png", width: 250pt),
  caption: [
    结果
  ],
)

最后的实验结果也比较理想。准确率和召回率都比较高。

== svm
<svm-1>
这里我并没有用到梯度预测、n折交叉验证（训练时间太长，实验时间不够）。
但我们完整实现了用libsvm的工具进行文本分类的必要步骤。以下均在`libsvm`目录下。

- 数据整理。
  `../THUCNews/trainData/trainData.txt`是待训练数据的原始形式，`../THUCNews/testData/testData.txt`是待预测数据。用`./svm-scale -l 0 -r train.scale ../THUCNews/trainData/trainData.txt`
  和`./svm-scale -l 0 -r test.scale ../THUCNews/testData/testData.txt`命令,
  可以将训练数据、测试数据整理为标准格式，且下界为0.
- 模型训练
  `./svm-train -h 0 -g 0.001 -c 10 train.scale my.model`得到模型文件。
- 数据预测 `./svm-predict test.scale my.model ans.out`

结果如下

#figure(
  image("019/svmans.png"),
  caption: [
    svman
  ],
)

实验结果较为理想。当然，该方法还有很多可以改进的空间，这里就不深究。

== {代码}
<代码>
#link("https://paste.ubuntu.com/p/nGWbQWmttr/")[超链接]

#link("https://paste.ubuntu.com/p/p9KQmh8Q2T/")[之前一版]
