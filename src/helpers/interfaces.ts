export interface ArticleObj {
    url: string;// znam te nazwy własności, bo spojrzałam sobie do konsoli i rozwinęłam artykuł o indexie 0
    urlToImage: string;
    title: string;
};

export interface ArticleProps {
    art: ArticleObj;
    key: string;
};

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData extends LoginFormData {
    password2: string;
}

export interface NavbarProps {
    loggedIn: boolean;
}

export interface UserPageProps {
    loggedIn: boolean;
}

export interface ProfilePhotoFormData {
    profilePhoto: FileList;
}