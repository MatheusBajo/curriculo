export interface ListItem {
    label: string;
    value: string;
    url?: string;
}

export interface Section {
    title: string;
    paragraph?: string;
    list?: ListItem[];
}

export interface AsideData {
    profilePicture: string;
    sections: Section[];
}

export interface HeaderData {
    nameLines: string[][];
    role: string[];
    contacts: {
        icon: string;
        label: string;
    }[];
}

export interface Experience {
    code: string;
    location: string;
    period: string;
    title: string;
    paragraph: string;
}

export interface MainData {
    header: HeaderData;
    experiences: Experience[];
    qualifications: string;
    skills: { label: string; pct: string }[];
    footerDate: string;
}

export interface ResumeData {
    aside: AsideData;
    main: MainData;
}
