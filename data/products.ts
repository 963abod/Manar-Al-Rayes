export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: string;
  image: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "طقم كنب صالون ملكي",
    category: "صالونات",
    description: "تصميم كلاسيكي فاخر بقماش مخملي وقواعد خشب زان مذهب، تفصيل حسب الطلب.",
    price: "حسب الطلب",
    image: "/images/product-1.jpg",
    featured: true,
  },
  {
    id: "2",
    name: "طقم صالون زاوية مودرن",
    category: "صالونات",
    description: "قماش كتان معالج مقاوم للبقع مع إسفنج عالي الكثافة وقاعدة خشب سويد.",
    price: "حسب الطلب",
    image: "/images/product-2.jpg",
    featured: false,
  },
  {
    id: "3",
    name: "طاولة طعام رخامية 8 مقاعد",
    category: "غرف طعام",
    description: "سطح رخام طبيعي مع كراسي منجدة بتطريز يدوي وقواعد معدنية متينة.",
    price: "حسب الطلب",
    image: "/images/product-3.jpg",
    featured: true,
  },
  {
    id: "4",
    name: "غرفة نوم ماستر مودرن",
    category: "غرف نوم",
    description: "سرير كينغ مع ظهر مبطن وإضاءة خفية وخزانة ملابس سحاب مدمجة.",
    price: "حسب الطلب",
    image: "/images/product-4.jpg",
    featured: true,
  },
  {
    id: "5",
    name: "كونسول مدخل مع مرآة دائرية",
    category: "إكسسوارات وكونسول",
    description: "سطح رخامي أسود مع إطار ستانلس ستيل مطلي بلون برونزي فاخر.",
    price: "حسب الطلب",
    image: "/images/product-5.jpg",
    featured: false,
  },
];
