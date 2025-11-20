const form = document.getElementById("audienceForm");
const personaContainer = document.getElementById("personaContainer");
const strategyOutput = document.getElementById("strategyOutput");
const timelineContainer = document.getElementById("timeline");
const simulateBtn = document.getElementById("simulateBtn");

const defaultData = {
  goal: "提升新品转化",
  industry: "智能家电",
  age: "25-35 岁",
  region: "一线城市",
  tags: "关注智能生活、以旧换新",
};

function buildPersonas({ goal, industry, age, region, tags }) {
  const baseDemand = goal.includes("唤醒") ? "二次触达" : "新品种草";
  return [
    {
      name: `${industry}数字先锋`,
      size: "占比 45%",
      description: `${region}${age}，偏好线上研究${industry}，重视体验升级。`,
      needs: ["体验短片/开箱", `强调${baseDemand}优惠`, "以旧换新补贴"],
      channels: ["视频号", "B 站科技区", "品牌社区"],
    },
    {
      name: "理性性价比派",
      size: "占比 32%",
      description: `关注预算与长期使用成本，常浏览评测与团购信息。`,
      needs: ["参数对比表", `${tags.split("、")[0]}场景案例`, "售后服务保障"],
      channels: ["知乎", "垂直科技媒体", "企业微信社群"],
    },
    {
      name: "潜力会员",
      size: "占比 23%",
      description: `沉睡会员，近期对${industry}内容互动升高，适合唤醒。`,
      needs: ["限时回归礼包", "专属客服跟进", `${region}线下体验券`],
      channels: ["短信", "APP Push", "线下门店"],
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
  const cadences = [
    {
      title: "触达节奏",
      items: [
        "T+0 热点引爆：社媒/视频平台直播体验",
        "T+2 深度教育：行业白皮书 + 评测内容",
        "T+5 转化加码：专属优惠券 + 私域 1v1",
      ],
    },
    {
      title: "内容策略",
      items: personas.map((persona) => `${persona.name}：${persona.needs[0]} & ${persona.needs[1]}`),
    },
    {
      title: "成功衡量",
      items: [
        goal.includes("转化") ? "新品支付转化率" : "回流购买率",
        "互动率 / 内容完播率",
        "私域成交金额",
      ],
    },
  ];

  strategyOutput.innerHTML = cadences
    .map(
      (block) => `
      <article class="strategy-block">
        <h4>${block.title}</h4>
        <ul>
          ${block.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
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
    },
    {
      title: "Agent 2 洞察正在运行",
      desc: "实时计算人群价值、画像特征与内容偏好。",
      state: "running",
    },
    {
      title: "Agent 3 策略输出待触发",
      desc: "等待营销负责人确认资源与预算配置。",
      state: "waiting",
    },
  ];

  timelineContainer.innerHTML = states
    .map(
      (item) => `
      <div class="timeline-item">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
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
simulateBtn.addEventListener("click", simulateFlow);

// 初始化默认数据
simulateFlow();
