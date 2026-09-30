/** Demo staff shown in admin until real profiles replace them. Order matches `seedTeam`. */
export type TeamPersonSeed = {
  nameHy: string;
  nameEn: string;
  positionHy: string;
  photoUrl: string;
};

export const teamPeople: readonly TeamPersonSeed[] = [
  { nameHy: "Կարեն Պետրոսյան", nameEn: "Karen Petrosyan", positionHy: "Կառավարման խորհրդի նախագահ", photoUrl: "/images/team/01.jpg" },
  { nameHy: "Անի Հակոբյան", nameEn: "Ani Hakobyan", positionHy: "Կառավարման խորհրդի անդամ", photoUrl: "/images/team/02.jpg" },
  { nameHy: "Վահե Գրիգորյան", nameEn: "Vahe Grigoryan", positionHy: "Կառավարման խորհրդի անդամ", photoUrl: "/images/team/03.jpg" },
  { nameHy: "Սուրեն Խաչատրյան", nameEn: "Suren Khachatryan", positionHy: "Գիտական խորհրդի նախագահ", photoUrl: "/images/team/04.jpg" },
  { nameHy: "Մարիամ Դավթյան", nameEn: "Mariam Davtyan", positionHy: "Գիտական խորհրդի անդամ", photoUrl: "/images/team/05.jpg" },
  { nameHy: "Տիգրան Ասատրյան", nameEn: "Tigran Asatryan", positionHy: "Գիտական խորհրդի անդամ", photoUrl: "/images/team/06.jpg" },
  { nameHy: "Արմեն Սահակյան", nameEn: "Armen Sahakyan", positionHy: "Ռեկտոր", photoUrl: "/images/team/07.jpg" },
  { nameHy: "Արայիկ Գյոզալյան", nameEn: "Arayik Gyozalyan", positionHy: "Որակի ապահովման և կրթության բարեփոխումների գծով պրոռեկտոր", photoUrl: "/images/team/08.jpg" },
  { nameHy: "Գայանե Մկրտչյան", nameEn: "Gayane Mkrtchyan", positionHy: "Ուսումնական գծով պրոռեկտոր", photoUrl: "/images/team/09.jpg" },
  { nameHy: "Նարեկ Վարդանյան", nameEn: "Narek Vardanyan", positionHy: "Ռեկտորի օգնական", photoUrl: "/images/team/10.jpg" },
  { nameHy: "Անահիտ Ղազարյան", nameEn: "Anahit Ghazaryan", positionHy: "Ընդհանուր բաժնի պետ", photoUrl: "/images/team/11.jpg" },
  { nameHy: "Մանուշակ Հովսեփյան", nameEn: "Manushak Hovsepyan", positionHy: "Որակի ապահովման առաջատար մասնագետ", photoUrl: "/images/team/12.jpg" },
  { nameHy: "Արման Պողոսյան", nameEn: "Arman Poghosyan", positionHy: "Մարդկային ռեսուրսների բաժնի պետ", photoUrl: "/images/team/13.jpg" },
  { nameHy: "Սոնա Կարապետյան", nameEn: "Sona Karapetyan", positionHy: "Կադրային մասնագետ", photoUrl: "/images/team/14.jpg" },
  { nameHy: "Դավիթ Հարությունյան", nameEn: "Davit Harutyunyan", positionHy: "Ընդհանուր բաժնի մասնագետ", photoUrl: "/images/team/15.jpg" },
  { nameHy: "Ռուբեն Ավագյան", nameEn: "Ruben Avagyan", positionHy: "Բուժական ֆակուլտետի դեկան", photoUrl: "/images/team/16.jpg" },
  { nameHy: "Լուսինե Մելքոնյան", nameEn: "Lusine Melkonyan", positionHy: "Ուսումնական աշխատանքների փոխդեկան", photoUrl: "/images/team/17.jpg" },
  { nameHy: "Աստղիկ Բաբայան", nameEn: "Astghik Babayan", positionHy: "Ուսումնամեթոդական համակարգող", photoUrl: "/images/team/18.jpg" },
  { nameHy: "Գագիկ Մինասյան", nameEn: "Gagik Minasyan", positionHy: "Ստոմատոլոգիական ֆակուլտետի դեկան", photoUrl: "/images/team/19.jpg" },
  { nameHy: "Նունե Սիմոնյան", nameEn: "Nune Simonyan", positionHy: "Կլինիկական աշխատանքների փոխդեկան", photoUrl: "/images/team/20.jpg" },
  { nameHy: "Հովհաննես Աբրահամյան", nameEn: "Hovhannes Abrahamyan", positionHy: "Բժշկական համալիրի ղեկավար", photoUrl: "/images/team/21.jpg" },
  { nameHy: "Սեդա Մանուկյան", nameEn: "Seda Manukyan", positionHy: "Թերապևտիկ ծառայություն", photoUrl: "/images/team/22.jpg" },
  { nameHy: "Արթուր Ղուկասյան", nameEn: "Artur Ghukasyan", positionHy: "Վիրաբուժական ծառայություն", photoUrl: "/images/team/23.jpg" },
  { nameHy: "Իրինա Բաղդասարյան", nameEn: "Irina Baghdasaryan", positionHy: "Ախտորոշիչ ծառայություն", photoUrl: "/images/team/24.jpg" },
  { nameHy: "Կարինե Ավետիսյան", nameEn: "Karine Avetisyan", positionHy: "Ստոմատոլոգիական ծառայություն", photoUrl: "/images/team/25.jpg" },
  { nameHy: "Մհեր Թովմասյան", nameEn: "Mher Tovmasyan", positionHy: "Կլինիկական ուսուցում", photoUrl: "/images/team/26.jpg" },
  { nameHy: "Վարդան Եղիազարյան", nameEn: "Vardan Yeghiazaryan", positionHy: "Կլինիկական ղեկավարում", photoUrl: "/images/team/27.jpg" },
  { nameHy: "Ալինա Նազարյան", nameEn: "Alina Nazaryan", positionHy: "Թերապևտիկ ծառայություն", photoUrl: "/images/team/28.jpg" },
  { nameHy: "Գևորգ Ստեփանյան", nameEn: "Gevorg Stepanyan", positionHy: "Վիրաբուժական ծառայություն", photoUrl: "/images/team/29.jpg" },
  { nameHy: "Մերի Անդրեասյան", nameEn: "Meri Andreasyan", positionHy: "Կլինիկական պրակտիկա", photoUrl: "/images/team/30.jpg" },
  { nameHy: "Աշոտ Դանիելյան", nameEn: "Ashot Danielyan", positionHy: "Ստոմատոլոգիական ծառայություն", photoUrl: "/images/team/31.jpg" },
  { nameHy: "Արսեն Գալստյան", nameEn: "Arsen Galstyan", positionHy: "Վիրաբուժական ստոմատոլոգիա", photoUrl: "/images/team/32.jpg" },
  { nameHy: "Շողիկ Մուրադյան", nameEn: "Shoghik Muradyan", positionHy: "Թերապևտիկ ստոմատոլոգիա", photoUrl: "/images/team/33.jpg" },
  { nameHy: "Անուշ Պապյան", nameEn: "Anush Papyan", positionHy: "Կանխարգելում", photoUrl: "/images/team/34.jpg" },
  { nameHy: "Լևոն Զաքարյան", nameEn: "Levon Zakaryan", positionHy: "Սիմուլյացիոն ուսուցում", photoUrl: "/images/team/35.jpg" },
  { nameHy: "Միլենա Առաքելյան", nameEn: "Milena Arakelyan", positionHy: "Կլինիկական հմտություններ", photoUrl: "/images/team/36.jpg" },
  { nameHy: "Հասմիկ Օհանյան", nameEn: "Hasmik Ohanyan", positionHy: "Նախակլինիկական սրահներ", photoUrl: "/images/team/37.jpg" },
  { nameHy: "Սամվել Կիրակոսյան", nameEn: "Samvel Kirakosyan", positionHy: "Սարքավորումներ", photoUrl: "/images/team/38.jpg" },
  { nameHy: "Նարինե Ավետիսյան", nameEn: "Narine Avetisyan", positionHy: "Գիտության գծով պրոռեկտոր", photoUrl: "/images/team/39.jpg" },
  { nameHy: "Հայկ Մարտիրոսյան", nameEn: "Hayk Martirosyan", positionHy: "Գիտական մասի ղեկավար", photoUrl: "/images/team/40.jpg" },
  { nameHy: "Լիլիթ Սարգսյան", nameEn: "Lilit Sargsyan", positionHy: "ՈՒԳԸ համակարգող", photoUrl: "/images/team/41.jpg" },
];
