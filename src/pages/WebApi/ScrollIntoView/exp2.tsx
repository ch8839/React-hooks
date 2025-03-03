import React, { useState, useRef, useEffect, useCallback } from "react";
import "./exp2.less";

export const Exp2 = (props: any) => {
  const [searchQuery, setSearchQuery] = useState(""); // 搜索关键字
  const [matches, setMatches] = useState<Element[]>([]); // 匹配的 DOM 元素
  const [activeIndex, setActiveIndex] = useState(0); // 当前激活的匹配项

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    document.querySelectorAll("#main-content .highlight").forEach((el) => {
      el.classList.remove("highlight");
      // el.innerHTML = el.textContent || ''; // 恢复原始内容（不行，会把span节点保留）
      if (el) {
        const textNode = document.createTextNode(el.textContent || ""); // 创建纯文本节点
        el.parentNode && el.parentNode.replaceChild(textNode, el); // 用文本节点替换当前节点
      }
    });

    const elements: Element[] = Array.from(
      document.querySelectorAll(
        "#main-content *:not(script):not(style):not(input):not(textarea)"
      )
    )
      .filter((node) => {
        return value ? node.textContent?.includes(value) : false;
      })
      .map((item) => {
        const regex = new RegExp(`(${value})`, "gi");
        item.innerHTML = item.innerHTML.replace(
          regex,
          `<span class="highlight">$1</span>`
        );
        return item;
      });
    const matchNodes = Array.from(
      document.querySelectorAll("#main-content .highlight")
    );
    setMatches(matchNodes);
    setActiveIndex(0);
  }, []);

  // 滚动到当前匹配项
  useEffect(() => {
    console.log(matches);
    matches?.forEach((item, index) => {
      if (index === activeIndex) {
        item?.classList.add("select-highlight");
      } else {
        item?.classList.remove("select-highlight");
      }
    });

    if (matches.length > 0 && matches[activeIndex]) {
      matches[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex, matches]);

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: "10px",
          right: "20px",
          textAlign: "right",
        }}
      >
        <input
          value={searchQuery}
          onChange={handleChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        ></input>
        <button
          onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0))}
        >
          prev
        </button>

        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % matches.length)}
        >
          next
        </button>
      </div>

      <div id="main-content">
        <p>aaabbb</p>
        <p>cccddd</p>
        <p>你好啊还是抖擞精神把飞机可不是打发时间发</p>
        <p>
          读取函数是原子的第一个参数。 依赖最初是空的。
          第一次使用时，我们运行读取函数并知道 uppercaseAtom 依赖于 textAtom。
          textAtom 依赖于 uppercaseAtom。 因此，将 uppercaseAtom 添加到 textAtom
          的依赖项中。 当我们重新运行读取函数时（因为它的依赖项 textAtom
          已更新），依赖项会再次创建，在本例中也是如此。
          然后我们删除陈旧的依赖项并替换为最新的依赖项。 原子可以按需创建
          虽然这里的基本示例显示了在组件外部全局定义原子，但对于我们可以在何处或何时创建原子没有任何限制。
          只要我们记得原子是由它们的对象引用身份标识的，我们就可以随时创建它们。
          如果您在渲染函数中创建原子，您通常希望使用像 useRef 或 useMemo 这样的
          hook 来进行 memoization。 否则，每次组件渲染时都会重新创建原子。
          您可以创建一个原子并将其存储在 useState
          中，甚至可以存储在另一个原子中。 请参阅问题 #5 中的示例。
          您可以在全局某处缓存原子。 请参阅此示例 或 那个例子。 检查参数化原子的
          utils 中的 atomFamily。
        </p>
        <p>
          关于原子的更多注释 如果您创建一个原始原子，它将使用预定义的 读/写
          函数来模拟 useState 行为。 如果你创建一个具有 读/写
          功能的原子，它们可以提供任何行为，但有一些限制，如下所示。 read
          函数将在 React 渲染阶段调用，因此该函数必须是纯函数。 此处 描述了
          React 中的纯内容。 write 函数将在您最初调用的地方调用，并在 useEffect
          中调用以进行后续调用。 所以，你不应该在渲染中调用 write。
          当一个原子最初使用 useAtom 时，它会调用 read
          函数来获取初始值，这是递归过程。 如果 Provider
          中存在原子值，它将被使用而不是调用 read 函数。
          一旦使用了一个原子（并存储在 Provider
          中），它的值只有在更新其依赖项时才会更新（包括直接使用 useAtom
          更新）。
        </p>
        <p>
          欢迎使用鹰角网络游戏软件和鹰角网络游戏服务。
          本《游戏测试用户协议》（以下简称“本协议”，详细定义见下）由您（定义见下）与鹰角网络（定义见下）共同缔结和签署，本协议具有合同效力，对协议双方均具有约束力。
          为了保障您的合法权益，请仔细阅读并理解本协议的所有内容，尤其是免除鹰角网络责任、限制您的权利、法律适用和争议解决等条款。前述条款通常以红色字体显示以提示您注意，您对前述条款的确认可能会给您带来限制、不便或损失，请您在确认同意本协议之前认真阅读前述条款。
          本协议适用于您使用测试服务器进行鹰角网络游戏软件（定义见下）和/或相关鹰角网络游戏服务（定义见下）的全部活动。若您希望使用鹰角网络游戏服务，则您应当阅读、同意并遵守本协议。您一旦点击“接受”、“同意”、“下一步”或具有同等含义的词语，或下载、安装、注册、开始使用任何鹰角网络游戏软件测试服务器或相关鹰角网络游戏服务，则视为您已阅读并同意本协议的所有条款，本协议由此正式生效；若您不同意本协议的任何内容，或者无法准确理解本协议的任何条款，则请不要进行后续操作，并停止使用鹰角网络游戏服务。
          鹰角网络保留必要时变更、修改本协议的权利，您在使用任何鹰角网络游戏服务时，应当及时查阅了解修改的内容，并自觉遵守本协议的相关内容。若您继续使用鹰角网络游戏服务的，则视为对修改内容的同意，当发生与本协议有关的任何争议时，以最新的协议内容为准；若您不同意修改的内容，则请停止使用任何鹰角网络游戏服务。
          您确认您是具备完全民事权利能力和完全民事行为能力的自然人，有能力签署并遵守本协议，并对您使用鹰角网络游戏服务的全部行为独立承担法律责任。若您未满18周岁，或不具备前述主体资格，请您立即退出本次游戏测试。
          一、定义 1.1
          本协议：指本《游戏测试用户协议》，及本协议授引《鹰角网络通行证用户注册协议》、《鹰角网络通行证个人信息保护政策》及其他援引的协议、规则或通知，
          本协议的前述内容为本协议不可分割的组成部分，与本协议正文具有同等法律效力。本协议内容可由鹰角网络通过发布公告、在页面显著位置提示或向您发送书面通知等合理方式不时更新和修改。
          1.2
          您：指通过阅读并签署本协议而取得许可使用鹰角网络游戏软件和鹰角网络游戏服务的自然人，本协议下又称为“用户”或“玩家”。
          1.3
          鹰角网络：指鹰角网络游戏软件和/或鹰角网络游戏服务的提供方，即上海鹰角网络科技有限公司及其关联公司。
          1.4
          鹰角网络游戏：指鹰角网络享有独立、完整知识产权或合法授权的任何网络游戏产品。本协议中，特指本次测试阶段的鹰角网络游戏产品。
          1.5
          鹰角网络游戏软件：指鹰角网络通过其自有网站或平台，或其合作方网站或平台提供的测试阶段鹰角网络游戏的软件（包括适用于移动设备、计算机设备、电视设备、智能终端设备等终端设备，以APP、计算机软件、客户端、微端、网页、HTML5等形式呈现的任何适配版本），及其更新、升级、补丁。在适用的情况下，鹰角网络游戏软件包括相关鹰角网络游戏的网络服务器、网站、电子媒体、印刷材料和电子文档。
          1.6
          鹰角网络游戏服务：指鹰角网络提供的与鹰角网络游戏软件相关的各项游戏运营服务。鹰角网络游戏服务的范围包括但不限于鹰角网络游戏软件。
          1.7
          鹰角网络游戏内容：指鹰角网络游戏软件或鹰角网络游戏服务包含的，或与之有关的，无论依据适用法律能否取得任何知识产权的任何名称、标题、标志、符号、设计、形象、服装、造型、图片、地图、道具、场景、音乐、台词、旁白、配音、故事叙述、动画、影音片段、源代码、目标代码、文档或任何其他类似元素或内容。
          1.8
          测试服务器：鹰角网络在其公布的测试阶段（包括但不限于封测、内测）中向用户提供鹰角网络游戏软件和鹰角网络游戏服务的服务器。
          1.9
          游戏测试数据：指您在测试服务器中产生的各种数据，包括但不限于角色数据、等级数据、虚拟物品数据、虚拟货币数据、交流数据、位置信息、服务日志、通讯日志、行为日志、购买日志等数据。
          1.10
          游戏虚拟货币：指仅得在本次测试游戏中为满足您在鹰角网络游戏中的正常交易、交流需求而提供的以特定数字单位表现的虚拟兑换工具。
          1.11
          游戏虚拟物品：指仅得在本次测试游戏中使用的虚拟物品，包括但不限于游戏角色、资源、游戏道具、技能、游戏装备、武器、坐骑、宠物。
        </p>
      </div>
    </div>
  );
};
