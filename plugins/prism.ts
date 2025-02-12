import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css"; // VS Code Dark Theme
import "~/assets/css/prism-vsc-dark-plus.css"; // VS Code Dark Theme
import "prismjs/components/prism-javascript"; // JavaScript
import "prismjs/components/prism-typescript"; // TypeScript;
import "prismjs/components/prism-css"; // CSS
// import "prismjs/components/prism-html"; // HTML
import "prismjs/components/prism-json"; // JSON
import "prismjs/components/prism-bash"; // Bash
import "prismjs/components/prism-python"; // Python
import "prismjs/components/prism-java"; // Java
import "prismjs/components/prism-c"; // C
import "prismjs/components/prism-cpp"; // C++
import "prismjs/components/prism-go"; // Go
import "prismjs/components/prism-rust"; // Rust
import "prismjs/components/prism-php"; // PHP
import "prismjs/components/prism-sql"; // SQL

export default defineNuxtPlugin(() => {
  return {
    provide: {
      prism: Prism,
    },
  };
});
