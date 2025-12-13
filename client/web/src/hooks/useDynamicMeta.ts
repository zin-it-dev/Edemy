import { useEffect } from "react";

interface MetaConfig {
  name?: string;
  property?: string;
  content: string;
}

const useDynamicMeta = (configs: MetaConfig[]) => {
  useEffect(() => {
    const elements: HTMLElement[] = [];

    configs.forEach(({ name, property, content }) => {
      let selector = "";
      if (name) selector = `meta[name="${name}"]`;
      if (property) selector = `meta[property="${property}"]`;

      let element = document.querySelector(selector) as HTMLMetaElement;

      if (!element) {
        element = document.createElement("meta");
        if (name) element.name = name;
        if (property) element.setAttribute("property", property);
        document.head.appendChild(element);

        elements.push(element);
      }

      element.content = content;
    });

    return () => {
      elements.forEach((meta) => {
        document.head.removeChild(meta);
      });
    };
  }, [JSON.stringify(configs)]);
};

export default useDynamicMeta;
