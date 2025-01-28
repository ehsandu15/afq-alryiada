import { PATHS } from "./paths";
import { SECTIONS_IDS } from "./sections-ids";
import aiDevelopIcon from "~/assets/images/services/ai-develop.svg";
import appDevelopIcon from "~/assets/images/services/app-develop.svg";
import cyberSecurityIcon from "~/assets/images/services/cyber-security.svg";
import internalSystemIcon from "~/assets/images/services/internal-system-develop.svg";
import webDevelopIcon from "~/assets/images/services/web-development.svg";
import noCodeDevelopIcon from "~/assets/images/services/no-code-develop.svg";
import webDevelopmentImage from "~/assets/images/services/3f117151c89d179309ea7e1634932d7f.png";
import cyberSecurityImage from "~/assets/images/services/cyber-security.jpeg";
import aiDevelopImage from "~/assets/images/services/ai.webp";
import spacialDevelopImage from "~/assets/images/services/spicial-programming.png";
import internalSystemsProgrammingImage from "~/assets/images/services/Internal-systems-programming.jpg";
import appDevelopImage from "~/assets/images/services/app-develop.jpg";
import type { ServiceType } from "~/types/services";
import facebookIcon from "~/assets/images/shared/social-media/facebook.svg";
import instagramIcon from "~/assets/images/shared/social-media/instagram.svg";
import twitterIcon from "~/assets/images/shared/social-media/twitter.svg";
import youtubeIcon from "~/assets/images/shared/social-media/youtube.svg";
import agLogo from "~/assets/images/partners/ag.svg";
import alHayahWaterLogo from "~/assets/images/partners/al-hayah-water.svg";
import batahafLogo from "~/assets/images/partners/batahaf.svg";
import tbcLogo from "~/assets/images/partners/tbc.svg";
import drughub from "~/assets/images/blog/drug-hub.svg";
import noFigma from "~/assets/images/blog/no-figma.svg";
import uiUxUseCase from "~/assets/images/blog/ui-ux-use-case.svg";
import user01 from "~/assets/images/customer-opinions/abdulrahman-mahmoud.svg";
import user02 from "~/assets/images/customer-opinions/abdulnasser-elzyat.svg";

export const NAV_LINKS = [
  { name: "الرئيسية", href: "/#" },
  { name: "من نحن", href: PATHS.ABOUT },
  { name: "خدماتنا", href: `/#${SECTIONS_IDS.SERVICES}` },
  { name: "أراء عملائنا", href: `/#${SECTIONS_IDS.TESTIMONIALS}` },
  // { name: "blogs", href: `/#${SECTIONS_IDS.BLOG}` },
];

export const services: Array<ServiceType> = [
  {
    id: 0,
    title: "برمجة المواقع",
    description:
      "تعمل علي تحويل افكار العملاء الي حقيقة رقمية مبتكرة, عن طريق فريقنا المتخصص من المطورين و المصممين الذين يمتلكون خبرة واسعة في تصميم و برمجة مواقع الويب بأحدث التقنيات, و نستخدم لغات برمجة متعددة لبناء هيكل المواقع و تحقيق التفاعلات المرغوبة,بجانب ذلك نفوم بتنفيذ قواعد البيانات و تكامل التقنيت الخادمية لضمان أداء الموقع بكفاءة،",
    image: webDevelopmentImage,
    icon: webDevelopIcon,
  },
  {
    id: 1,
    title: "برمجة التطبيقات",
    description:
      "تتميز بثيرة واسعة في استخدام أحدث التقنيات والذوات، ونعمل محك لفهم احتياجاتك لتصميم وتطوير تطبيقات عالية الجودة وسلسة االستخدام. لتلبي متطلباتك الخاصة، ومن أهم مميزاتنا تقديم دعمًا فنيًا متميزًا على مدار الساعة طوال أيام األسبوع",
    image: appDevelopImage,
    icon: appDevelopIcon,
  },
  {
    id: 2,
    title: "البرمجة الخاصة",
    description:
      "تركز البرمجة الخاصة على فهم احتياجاتك بدقة وتصميم حلول تناسبها بشكل مثالي، وتمنحك البرمجة الخاصة ميزة تنافسية قوية في السوق من خلال توفير مميزات ومطاقف غير متوفرة في البرامج الجاهزة. وبساعدك في تحديث مواقفك وتطبيقاتك بسهولة لتلبية احتياجاتك المتغيرة.",
    image: spacialDevelopImage,
    icon: noCodeDevelopIcon,
  },
  {
    id: 3,
    title: "الذكاء الإصطناعي",
    description:
      "|تلبية لتابيا ةحيرصلا ةيبرعلا ةكلملا يف تارشلا تايلجناو توب ثلاثب ةدرومو ،ليغشتلا ةيلعم عيرست يف تاحلستلا ةدمخلا هذهو عمانملا ةيفارم ىلع ردامتو ،تيلابجلتلاو رايزاقتلاو تايعيبلا يف تاحلسيس Voice Assistant ،لمعلا ريبس نامضل تارشلاو تايفشتسلامو ةيرع ةغل اذه لكو ،هجوم لما أ ىلع اينوفلتب ءاطعلا ةمدخ لمعب موقيس ناملأل ةمدخلا ددحيتمزيتت و ،ةلواس لكيد ادخلا لكي كي يف تاحلسيس ام،طبيعب تابلازيملا عيمج بسانتُ ةيسلفن اربعأب اههاكشو ،ىلعمللا تانايب ةيررس|",
    image: aiDevelopImage,
    icon: aiDevelopIcon,
  },
  {
    id: 4,
    title: "برمجة الأنظمة الداخلية",
    description:
      "عملية إنشاء قواعد البيانات والأنظمة الداخلية باستخدام Odoo و Oracle. وهما أنظمة إدارة المحتوى (CMS)، مما يتبع لك استضافة وبناء قواعد البيانات والأنظمة الداخلية. ويتميز أوالكل وأودو بـ بأدائهما العالي وقدرتهما على معالجة كميات كبيرة من البيانات بكفاءة، ونقدم لك التدريب والدعم اللازمين لضمان استخدامك الأمثل لنظامك",
    image: internalSystemsProgrammingImage,
    icon: internalSystemIcon,
  },
  {
    id: 5,
    title: "الأمن السيبراني وحلول الأمن الإلكتروني",
    description:
      "توفــر حلولنــا المتكاملــة ميزات متقدمــة مثــل جــدار الحمايــة، ومكافحــة الفيروســات، ومنــع البريــد العنــتوائي. والتجكــم فــي المحتــوى، ممــا يضمــن حمايــة شاملــة لشبكاتــك وأجهزتــك. مــع خبرتنا الواســعة وسمعتنا المتصينــة، حيــث نساعــدك علــى ضمــان أمــان بياناتــك وسلامــة عملك فــي بيئــة رقميــة آمنــة",
    image: cyberSecurityImage,
    icon: cyberSecurityIcon,
  },
];

export const SOCIAL_LINKS = [
  {
    id: 0,
    title: "facebook",
    icon: facebookIcon,
  },
  {
    id: 1,
    title: "instagram",
    icon: instagramIcon,
  },
  {
    id: 2,
    title: "twitter",
    icon: twitterIcon,
  },
  {
    id: 3,
    title: "youtube",
    icon: youtubeIcon,
  },
];

export const APP_HEADER_HEIGHT = {
  MOBILE: 52,
  DESKTOP: 60,
};

export const PARTNERS = [
  {
    id: 1,
    name: "ag.svg",
    logo: agLogo,
  },
  {
    id: 2,
    name: "al-hayah-water.svg",
    logo: alHayahWaterLogo,
  },
  {
    id: 3,
    name: "batahaf.svg",
    logo: batahafLogo,
  },
  {
    id: 4,
    name: "tbc.svg",
    logo: tbcLogo,
  },
  {
    id: 5,
    name: "ag.svg",
    logo: agLogo,
  },
  {
    id: 6,
    name: "al-hayah-water.svg",
    logo: alHayahWaterLogo,
  },
  {
    id: 7,
    name: "batahaf.svg",
    logo: batahafLogo,
  },
  {
    id: 8,
    name: "tbc.svg",
    logo: tbcLogo,
  },
];

export const ARTICLES = [
  {
    mediaUrl: drughub,
    title: "DrugHub: كيف لا تدير سوقًا على الشبكة المظلمة",
    keywords: ["Crime", "Information security", "Osit", "Darkweb"],
    date: new Date("2021-12-15").toISOString(),
  },
  {
    mediaUrl: noFigma,
    title:
      "لم يعد برنامج Figma موجودًا إلى الأبد، كما اختفى برنامج inVision الآن.",
    keywords: ["Design", "UX", "Figma", "UI Design"],
    date: new Date("2024-12-15").toISOString(),
  },
  {
    mediaUrl: uiUxUseCase,
    title:
      "دراسة حالة UX/UI — تحسين تجربة حجز الرحلات الجوية عبر الإنترنت لشركة Ryanair",
    keywords: ["Design", "UX", "Use case", "Figma", "UI Design"],
    date: new Date("2024-12-15").toISOString(),
  },
];

export const COMMENTS = [
  {
    id: 0,
    title: "عبدالرحمن محمود احمد",
    avatarUrl: user01,
    commentAuthor: "عبدالرحمن محمود احمد",
    authorTitle: "مؤسس شركة تيسلا",
    comment: "شغل احترافي وسريع ما شاء الله",
  },
  {
    id: 1,
    title: "عبد الناصر الزيات",
    avatarUrl: user02,
    commentAuthor: "عبد الناصر الزيات",
    authorTitle: "مؤسس شركة تيسلا",
    comment:
      "من أفضل الشركات تعامل ومتابعة وانجاز بصورة جميلة وإن شاء الله راح يكون بينا تعاملات مر كتير الأيام القادمة.",
  },
  {
    id: 2,
    title: "عبد الناصر الزيات",
    avatarUrl: user01,
    commentAuthor: "عبد الناصر الزيات",
    authorTitle: "مؤسس شركة تيسلا",
    comment:
      "من أفضل الشركات تعامل ومتابعة وانجاز بصورة جميلة وإن شاء الله راح يكون بينا تعاملات مر كتير الأيام القادمة.",
  },
  {
    id: 3,
    title: "عبد الناصر الزيات",
    avatarUrl: user02,
    commentAuthor: "عبد الناصر الزيات",
    authorTitle: "مؤسس شركة تيسلا",
    comment:
      "من أفضل الشركات تعامل ومتابعة وانجاز بصورة جميلة وإن شاء الله راح يكون بينا تعاملات مر كتير الأيام القادمة.",
  },
  {
    id: 4,
    title: "عبد الناصر الزيات",
    avatarUrl: user01,
    commentAuthor: "عبد الناصر الزيات",
    authorTitle: "مؤسس شركة تيسلا",
    comment:
      "من أفضل الشركات تعامل ومتابعة وانجاز بصورة جميلة وإن شاء الله راح يكون بينا تعاملات مر كتير الأيام القادمة.",
  },
  {
    id: 5,
    title: "عبد الناصر الزيات",
    avatarUrl: user02,
    commentAuthor: "عبد الناصر الزيات",
    authorTitle: "مؤسس شركة تيسلا",
    comment:
      "من أفضل الشركات تعامل ومتابعة وانجاز بصورة جميلة وإن شاء الله راح يكون بينا تعاملات مر كتير الأيام القادمة.",
  },
  {
    id: 6,
    title: "عبد الناصر الزيات",
    avatarUrl: user01,
    commentAuthor: "عبد الناصر الزيات",
    authorTitle: "مؤسس شركة تيسلا",
    comment:
      "من أفضل الشركات تعامل ومتابعة وانجاز بصورة جميلة وإن شاء الله راح يكون بينا تعاملات مر كتير الأيام القادمة.",
  },
  {
    id: 7,
    title: "عبد الناصر الزيات",
    avatarUrl: user02,
    commentAuthor: "عبد الناصر الزيات",
    authorTitle: "مؤسس شركة تيسلا",
    comment:
      "من أفضل الشركات تعامل ومتابعة وانجاز بصورة جميلة وإن شاء الله راح يكون بينا تعاملات مر كتير الأيام القادمة.",
  },
];
