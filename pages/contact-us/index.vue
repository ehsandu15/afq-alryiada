<template>
  <section
    class="app-container container flex min-h-fit flex-col items-center justify-start"
  >
    <div class="contact-us-wrapper">
      <figure
        class="contacts-wrapper"
        :style="{
          backgroundImage: `url(${content?.data.contactBoxImage.url})`,
        }"
      >
        <h4 class="heading">{{ content?.data.contactBoxHeading }}</h4>
        <ul class="contact-info-list">
          <li
            v-for="(info, index) in content?.data.contacts_infos"
            :key="info.id"
          >
            <NuxtImg
              :src="info.icon.url"
              :alt="info.icon.alternativeText"
              width="32"
              height="32"
            />
            <p v-if="info.type === 'TEXT'">{{ info.value }}</p>
            <a
              class="text-white"
              target="_blank"
              referrerpolicy="no-referrer"
              v-if="info.type === 'LINK'"
              :href="info.value"
              >{{ info.name }}</a
            >
          </li>
        </ul>
      </figure>
      <form
        @submit.prevent="handleSubmit"
        class="grid w-full grid-cols-1 gap-7 px-3 md:grid-cols-2 md:gap-[50px] lg:ps-[50px]"
      >
        <span
          class="col-span-2 flex flex-col gap-1.5 sm:xs:col-span-1"
          v-for="elem of content?.data.contactForm.filter(
            (item) =>
              item.__component === 'shared.form-field' &&
              item.type !== 'textarea',
          )"
        >
          <label :for="elem.elemId">{{ elem.title }}</label>
          <input
            v-if="
              elem.type !== 'textarea' &&
              elem.__component === 'shared.form-field'
            "
            :type="elem.type"
            :name="elem.name"
            :id="elem.elemId"
            dir="rtl"
            :placeholder="elem.placeholder"
            required
            class="w-full border-b-[1px] border-[#a5a5a5] px-[10px] py-[5px] text-sm font-medium leading-5 text-[#1f1f1f] outline-none focus:border-[#1f1f1f]"
          />
        </span>
        <span
          class="col-span-2 flex flex-col gap-1.5"
          v-for="elem of content?.data.contactForm.filter(
            (item) =>
              item.type === 'textarea' &&
              item.__component === 'shared.form-field',
          )"
        >
          <label :for="elem.elemId">{{ elem.title }}</label>
          <textarea
            :name="elem.name"
            :id="elem.elemId"
            rows="5"
            :placeholder="elem.placeholder"
            class="w-full border-b-[1px] border-[#a5a5a5] px-[10px] py-[5px] text-sm font-medium leading-5 text-[#1f1f1f] outline-none focus:border-[#1f1f1f]"
          />
        </span>
        <div
          class="relative col-span-2 flex flex-col justify-start gap-4 tablet:-mt-8"
        >
          <!-- subbmit button with turnsite wrapper -->
          <NuxtTurnstile v-model="turnstileToken" />
          <div
            class="flex flex-col flex-wrap gap-3 md:flex-row md:items-center"
          >
            <button
              v-for="action of content?.data.formActions"
              type="submit"
              class="btn btn-primary disabled:bg-neutral-400 max-md:!px-8"
              :disabled="isValidatedTurnstile === false"
            >
              <template v-if="!isSending">
                <p>{{ action.title }}</p>
                <NuxtImg
                  width="24"
                  height="24"
                  :src="action.icon.url"
                  :alt="action.icon.alternativeText"
                />
              </template>
              <template v-if="isSending">
                <span
                  class="size-4 animate-spin rounded-full border-4 border-white border-l-secondary"
                ></span>
              </template>
            </button>
            <div
              class="ems-center pointer-events-none flex w-full translate-x-6 gap-4 px-3 py-2 opacity-0 shadow-md transition-transform duration-500 md:w-fit"
              :class="
                clsx(
                  { 'bg-red-200': isError },
                  { 'bg-emerald-200': isSentMessage },
                  {
                    'pointer-events-auto !translate-x-0 !opacity-100':
                      isSentMessage || isError,
                  },
                )
              "
            >
              <span class="flex size-8 -rotate-6 items-center justify-center">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0002 19C15.0002 20.6569 13.6571 22 12.0002 22C10.3434 22 9.00025 20.6569 9.00025 19M13.7968 6.23856C14.2322 5.78864 14.5002 5.17562 14.5002 4.5C14.5002 3.11929 13.381 2 12.0002 2C10.6195 2 9.50025 3.11929 9.50025 4.5C9.50025 5.17562 9.76825 5.78864 10.2037 6.23856M2.54707 8.32296C2.53272 6.87161 3.3152 5.51631 4.57928 4.80306M21.4534 8.32296C21.4678 6.87161 20.6853 5.51631 19.4212 4.80306M18.0002 11.2C18.0002 9.82087 17.3681 8.49823 16.2429 7.52304C15.1177 6.54786 13.5915 6 12.0002 6C10.4089 6 8.88283 6.54786 7.75761 7.52304C6.63239 8.49823 6.00025 9.82087 6.00025 11.2C6.00025 13.4818 5.43438 15.1506 4.72831 16.3447C3.92359 17.7056 3.52122 18.3861 3.53711 18.5486C3.55529 18.7346 3.58876 18.7933 3.73959 18.9036C3.87142 19 4.53376 19 5.85844 19H18.1421C19.4667 19 20.1291 19 20.2609 18.9036C20.4117 18.7933 20.4452 18.7346 20.4634 18.5486C20.4793 18.3861 20.0769 17.7056 19.2722 16.3447C18.5661 15.1506 18.0002 13.4818 18.0002 11.2Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span class="w-full font-semibold capitalize" v-if="isError">
                <small
                  class="text-red-900"
                  v-if="
                    errorMsg === SEND_MESSAGE_RESPONSE.DUPLICATED_USER_EMAIL
                  "
                >
                  {{ content?.data.formDuplicatedUseMessage }}
                </small>
                <small class="text-red-900" v-else>
                  {{ content?.data.formSomethingWentWrongMessage }}
                </small>
              </span>
              <span
                class="w-full font-semibold capitalize"
                v-if="isSentMessage"
              >
                <small v-if="isSentMessage" class="text-emerald-900">
                  {{ content?.data.formSendSuccessMessage }}
                </small>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { ContactData } from "~/types/contact-us";
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
import { SEND_MESSAGE_RESPONSE } from "~/constants/send-message-response";
import clsx from "clsx";
import type {
  MessageBody,
  MessageResponseError,
  MessageResponseType,
} from "~/types/send-message-api";
const { findOne } = useStrapi<ContactData>();
const nuxtApp = useNuxtApp();
const isSentMessage = ref(false);
const isSending = ref(false);
const isError = ref(false);
const errorMsg = ref(null);
const turnstileToken = ref<string>("");
const isValidatedTurnstile = ref<boolean>(false);

const verifyTurnstile = async () => {
  return await $fetch("/_turnstile/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { token: turnstileToken.value },
  });
};

watchEffect(async () => {
  if (!Boolean(turnstileToken.value)) {
    console.warn(
      "WARNING ,No token provided please make sure to solve the captcha",
    );
    return;
  }
  const validToken = await verifyTurnstile();

  isValidatedTurnstile.value = validToken.success;
});

const handleSubmit = async (ev: Event) => {
  const target = ev.target as HTMLFormElement;
  const fd = new FormData(ev.currentTarget as any);

  if (!isValidatedTurnstile.value) {
    console.warn("WARNING , Please solve the captcha first !!");
    return;
  }

  const data: Omit<MessageBody, "ipV4" | "location"> = {
    firstName: fd.get("firstName") as string,
    lastName: fd.get("lastName") as string,
    phoneNumber: fd.get("phoneNumber") as string,
    email: fd.get("email") as string,
    message: fd.get("message") as string,
  };
  try {
    isSending.value = true;
    const res = await $fetch<MessageResponseType>(
      `/api/contact-us/send-message`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
    if (res?.success) {
      isSentMessage.value = true;
      isError.value = false;
      target?.reset();
    }
  } catch (error: any) {
    console.log(error.statusMessage);
    isError.value = error.error || true;
    errorMsg.value = error.statusMessage;
    isSentMessage.value = false;

    console.error("ERROR !! ", error);
  } finally {
    isSending.value = false;
  }
};
const { data: content, status: contentStatus } = useAsyncData(
  STRAPI_ENDPOINT.CONTACT_US,
  () =>
    findOne(STRAPI_ENDPOINT.CONTACT_US, {
      locale: "ar-SA",
      populate: {
        contactForm: true,
        formActions: {
          populate: { icon: true },
        },
        contacts_infos: {
          populate: { icon: true },
        },
        whatsapp: {
          populate: {
            icon: true,
          },
        },
        contactBoxImage: true,
      },
    }),
  {
    transform: (res) =>
      nuxtApp.runWithContext(() => ({
        ...res,
        data: {
          ...res.data,
          contactBoxImage: {
            ...res.data.contactBoxImage,
            url: imagePathPrefix(res.data.contactBoxImage.url),
          },
          contacts_infos: res.data.contacts_infos.map((item) => ({
            ...item,
            icon: { ...item.icon, url: imagePathPrefix(item.icon.url) },
          })),
          whatsapp: {
            ...res.data.whatsapp,
            icon: {
              ...res.data.whatsapp.icon,
              url: imagePathPrefix(res.data.whatsapp.icon.url),
            },
          },
          formActions: {
            ...res.data.formActions.map((item) => ({
              ...item,
              icon: {
                ...item.icon,
                url: imagePathPrefix(item.icon.url),
              },
            })),
          },
        },
      })),
  },
);

watch(
  () => [isError.value, isSentMessage.value],
  (oldVal, newVal, onCleanup) => {
    let timeout = setTimeout(() => {
      isError.value = false;
      isSentMessage.value = false;
    }, 6000);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  },
);

watchEffect(() => {
  if (!content.value || contentStatus.value !== "success") return;
  useServerSeoMeta({
    title: content.value?.data.seoTitle,
    description: content.value?.data.seoDescription,
    ogTitle: content.value?.data.seoTitle,
    ogDescription: content.value?.data.seoDescription,
  });
});
</script>
<style>
.contact-us-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  align-items: center;
  padding-block: 50px;
  overflow: hidden;
}

@media (max-width: 992px) {
  .contact-us-wrapper {
    flex-direction: column;
    gap: 50px;
  }
}
.contacts-wrapper {
  background-size: cover;
  background-repeat: no-repeat;
  width: 491px;
  min-width: 491px;
  height: 489px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  justify-content: flex-start;
}
@media (max-width: 876px) {
  .contacts-wrapper {
    background-position: bottom;
    width: clamp(calc(100% - 50px), calc(50% - 50px), calc(50% - 50px));
    min-width: calc(100% - 0.5rem);
    background-position: bottom;
  }
}
.contacts-wrapper .heading {
  margin-block: 40px;
  font-size: 28px;
  font-weight: 600;
  line-height: 52px;
  color: #ffffff;
  text-align: center;
}
.contacts-wrapper .contact-info-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  padding-inline: 14px;
}
.contacts-wrapper .contact-info-list > li {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.contacts-wrapper .contact-info-list > li p {
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: #ffffff;
}

.form-wrapper {
  display: grid;
  gap: 50px;
  padding-inline: 50px;
  padding-inline-end: 0%;
  padding-block: 65px;
  flex: 1 0 max-content;
  grid-template-columns: 2 fr;
}

@media (max-width: 876px) {
  .form-wrapper {
    padding-inline: 1rem;
    width: 100%;
    grid-template-columns: 1 fr;
  }
}
.form-wrapper .form-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 54px;
}
@media (max-width: 876px) {
  .form-wrapper .form-group {
    grid-template-columns: repeat(1, 1fr);
  }
}
.form-wrapper .form-group.full-width {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
.form-wrapper .form-group .group-wrapper {
  display: flex;
  flex-direction: column;
}
.form-wrapper .form-group label {
  font-size: 12px;
  font-weight: 600;
  color: #a5a5a5;
  margin-bottom: 3.5px;
}
.form-wrapper .form-group .input {
  width: 100%;
  padding-block: 7px;
  padding-inline: 10px;
  border-bottom: 1px solid #a5a5a5;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #1f1f1f;
}
.form-wrapper .form-group .input:focus {
  border-color: #1f1f1f;
  outline: none;
}
</style>
