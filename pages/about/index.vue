<template>
  <section class="flex min-h-screen flex-col items-center justify-start">
    <div
      class="app-container container flex w-full flex-col items-center justify-center"
    >
      <img
        :src="fullLogo"
        alt="Full Logo"
        class="mb-8 mt-[84px] h-[120px] w-full md:w-[295px]"
      />
      <p
        class="mb-8 text-center text-[20px] font-semibold capitalize text-app-black-secondary md:text-[28px]"
      >
        بخبرة تعامل مع أكثر من مشروع بناء برمجي، وخبرة دامت لسنوات نساعدك بتطوير
        خدماتك الرقمية من خلال تقديم برمجة موقعك الخاص، وبرمجة التطبيقات،
        والبرمجة الخاصة كما نقدم برمجة مخصصة للأنظمة الداخلية للشركات، عن طريق
        منصات مثل أودو واوراكل، من خلال مبرمجينا المتخصصين في بناء وتحسين موقعك
        وتطبيقاتك من الصفر نتميزب لغات البرمجة المتقدمة، حيث نستخدم أحدث الوسائل
        في بناء Laravel و React.js موقعك ومواكبة التقنيات الحديثة مثل لدينا
        فريقنا الخاص بالأمن السيبراني الذي يقوم بالتصدي المستمر لأي محاولات
        انتهاك لمعلومات عملاؤنا، ونُساعدك على ضمان أمان بياناتك وسلامة عملك في
        بيئة رقمية آمنة، مع الضمان والدعم الفني المستمر لعملاؤنا
      </p>
      <ul
        class="mb-[104px] flex min-w-[266px] items-center justify-center gap-5"
      >
        <li
          v-for="item of SOCIAL_LINKS"
          :key="item.id"
          class="size-[32px] rounded-full bg-secondary"
        >
          <img :src="item.icon" :alt="item.title" />
        </li>
      </ul>
    </div>
    <div
      class="flex flex-col items-center justify-start"
      :style="{ backgroundImage: `url(${backgroundPatterns})` }"
    >
      <AdvancedSectionHeading
        title="اهدافنا"
        icon-color-class="bg-secondary"
        class="mb-10 mt-[60px]"
      />
      <p
        class="app-container container mb-10 text-center text-[20px] font-semibold capitalize text-white md:text-[28px]"
      >
        رحلتنا من البداية في رحلة تكنولوچية مميزة، قرر مجموعة من الموهوبين
        وأصحاب الخبرات، التعاون لصناعة إسم كبير وقادر على صناعة الفارق في مجال
        البرمجة بالمملكة العربية السعودية، وامتدت الرحلة بنا حتى تعاوننا مع كبرى
        المؤسسات والشركات في السعودية، ومازالت الرحلة مستمرة... نشأت أفق الريادة
        كمجموعة صغيرة من المحترفين المستقلين، حيث كانوا يتشاركون شغفًا ورؤى
        واحدة في تحسين السوق السعودي من خلال التكنولوچيا والبرمجة. ثم تحولت أفق
        الريادة لشركة إحترافية رائدة في المجال ونجحنا في تحويل مجموعتنا إلى
        مؤسسة معتمدة، وهذا التطور كان نتيجة لقدرتنا على تلبية توقعات العملاء
        بكفاءة وتقديم حلول مبتكرة في مجال البرمجة وتكنولوچيا المعلومات.
      </p>
      <NuxtLink
        :href="PATHS.CONTACT"
        class="mb-[60px] flex items-center justify-center rounded-[200px] bg-secondary px-5 py-[10px]"
      >
        <p
          class="text-center text-[15px] font-semibold leading-[25px] text-white"
        >
          تواصل معنا
        </p>
      </NuxtLink>
    </div>
    <div
      class="app-container container flex flex-col items-center justify-start"
    >
      <h3
        class="mb-4 mt-[100px] text-center text-[44px] font-extrabold leading-[61px] text-app-black-secondary md:text-[56px]"
        v-html="headingTitle"
      ></h3>
      <p
        class="mb-[104px] text-center text-lg font-medium text-app-black-secondary"
      >
        تتمثل في الاهتمام بالتفاصيل بأفضل شكل. وتقديم خدمات عالية الجودة تتناسب
        مع طبيعة أهدافك التجارية. وتقديم مجموعه خدمات برمجيه متكامله ومتناسبة
        لإنشاء المواقع والتطبيقات الإحترافية.
      </p>
    </div>
  </section>
  <ScrollTopButton :button-visible-position="520" />
  <a
    :href="`https://wa.me/${+9661233333333}`"
    class="fixed bottom-10 left-6 isolate z-30 flex size-[54px] items-center justify-center rounded-full shadow-2xl md:bottom-14 md:left-12 md:size-[64px]"
  >
    <img src="~/assets/images/shared/whatsapp.svg" alt="whatsapp.svg" />
  </a>
</template>
<script setup lang="ts">
import fullLogo from "~/assets/images/shared/full-logo.svg";
import facebookIcon from "~/assets/images/shared/social-media/facebook.svg";
import instagramIcon from "~/assets/images/shared/social-media/instagram.svg";
import twitterIcon from "~/assets/images/shared/social-media/twitter.svg";
import youtubeIcon from "~/assets/images/shared/social-media/youtube.svg";
import backgroundPatterns from "~/assets/images/about/bg.svg";
import { PATHS } from "~/constants/paths";

const SOCIAL_LINKS = [
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

const headingTitle = computed(() =>
  highlightSpecificWord({
    text: "رؤيتنا لمستقبل أفضل",
    word: "أفضل",
    classNames: "text-secondary",
  }),
);
</script>
