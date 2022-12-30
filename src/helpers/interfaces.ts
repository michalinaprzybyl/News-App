export interface ArticleObj {
    url: string;// znam te nazwy własności, bo spojrzałam sobie do konsoli i rozwinęłam artykuł o indexie 0
    urlToImage: string;
    title: string;
};

export interface ArticleProps {
    art: ArticleObj;
    key: string;
};