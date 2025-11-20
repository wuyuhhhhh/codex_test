const form = document.getElementById("audienceForm");
const personaContainer = document.getElementById("personaContainer");
const strategyOutput = document.getElementById("strategyOutput");
const timelineContainer = document.getElementById("timeline");

const defaultData = {
  goal: "提升新品转化",
  industry: "智能家电",
  age: "25-35 岁",
  region: "一线城市",
  tags: "关注智能生活、以旧换新",
};

function buildPersonas({ goal, industry, age, region, tags }) {
  const baseDemand = goal.includes("唤醒") ? "二次触达" : "新品种草";
  const firstTag = (tags || "").split("、")[0] || "核心场景";

  return [
    {
      name: `${industry}数字先锋`,
      size: "核心 45%",
      description: `${region}、${age}，偏好线上研究与体验升级。`,
      needs: ["体验短片/开箱", `强调${baseDemand}优惠`],
      channels: ["视频号", "品牌社区"],
    },
    {
      name: "理性性价比派",
      size: "补充 35%",
      description: `关注预算与长期使用成本，常浏览评测与团购信息。`,
      needs: ["参数对比", `${firstTag}案例`],
      channels: ["知乎", "垂直科技媒体"],
    },
  ];
}

function renderPersonas(personas) {
  personaContainer.innerHTML = personas
    .map(
      (persona) => `
      <article class="card">
        <div class="tag">${persona.size}</div>
        <h3>${persona.name}</h3>
        <p>${persona.description}</p>
        <h4>关键需求</h4>
        <ul>
          ${persona.needs.map((need) => `<li>${need}</li>`).join("")}
        </ul>
        <h4>优先渠道</h4>
        <p>${persona.channels.join(" · ")}</p>
      </article>
    `
    )
    .join("");
}

function buildStrategy(personas, goal) {
  const channelOptions = [
    "短信：新品上线提醒 + 限时券",
    "邮件：参数对比/开箱报告",
    "视频号：直播体验 + 技术亮点",
    "社群：私域 1v1 解答与加码券",
  ];

  const copyIdeas = personas.map(
    (persona) =>
      `${persona.name}｜以${persona.needs[0]}打头，辅以${persona.needs[1]}; 强调「${
        goal.includes("转化") ? "新品体验升级+限时券" : "会员回归礼包+专属客服"
      }」，引导点击落地页并追加私域咨询入口。`
  );

  strategyOutput.innerHTML = personas
    .map(
      (persona, idx) => `
      <article class="strategy-card">
        <header class="strategy-card__head">
          <div class="tag">${persona.size}</div>
          <h3>${persona.name} 场景策略</h3>
        </header>
        <div class="strategy-columns">
          <article class="strategy-block">
            <h4>触达节奏</h4>
            <ul>
              <li>T+0 热点引爆：社媒视频平台直播体验</li>
              <li>T+3 转化加码：专属优惠券 + 私域 1v1</li>
            </ul>
          </article>
          <article class="strategy-block">
            <h4>内容策略</h4>
            <ul>
              <li>${persona.name}：${persona.needs.join(" / ")}</li>
            </ul>
          </article>
          <article class="strategy-block">
            <h4>触达渠道</h4>
            <ul>
              ${channelOptions.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
          <article class="strategy-block">
            <h4>触达文案</h4>
            <ul>
              <li>${copyIdeas[idx]}</li>
            </ul>
          </article>
        </div>
      </article>
    `
    )
    .join("");
}

function updateTimeline(goal) {
  const states = [
    {
      title: "Agent 1 完成人群圈选",
      desc: `根据 ${goal} 场景筛选 12.4w 名候选用户，已写入数据仓库。`,
      state: "done",
      actionLabel: "查看数据仓库",
    },
    {
      title: "Agent 2 洞察正在运行",
      desc: "实时计算人群价值、画像特征与内容偏好。",
      state: "running",
    },
    {
      title: "Agent 3 策略输出待触达",
      desc: "等待营销负责人确认资源与预算配置。",
      state: "waiting",
      actionLabel: "查看当前流程",
    },
  ];

  timelineContainer.innerHTML = states
    .map(
      (item) => `
      <div class="timeline-item">
        <div class="timeline-row">
          <div>
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
          </div>
          ${
            item.actionLabel
              ? `<button class="timeline-btn" type="button">${item.actionLabel}</button>`
              : ""
          }
        </div>
        <div class="status" data-state="${item.state}">
          <span></span>
          <strong>${item.state === "done" ? "已完成" : item.state === "running" ? "运行中" : "待执行"}</strong>
        </div>
      </div>
    `
    )
    .join("");
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  const personas = buildPersonas(payload);
  renderPersonas(personas);
  buildStrategy(personas, payload.goal);
  updateTimeline(payload.goal);
}

function simulateFlow() {
  form.goal.value = defaultData.goal;
  form.industry.value = defaultData.industry;
  form.age.value = defaultData.age;
  form.region.value = defaultData.region;
  form.tags.value = defaultData.tags;
  form.dispatchEvent(new Event("submit"));
}

form.addEventListener("submit", handleSubmit);
// 初始化默认展示
simulateFlow();
