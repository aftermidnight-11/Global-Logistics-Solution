const fs = require('fs');

function update(file, newData) {
  const data = JSON.parse(fs.readFileSync(file));
  data.data = newData;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

const en = {
  team: {
    zoya: { name: "Zoya Falak", role: "Managing Director", bio: "3 years of experience in tech, Deals with requests." },
    ashique: { name: "Ashique Ali", role: "Shipping & Logistics", bio: "20 years in regional forwarding and compliance." },
    hasnain: { name: "Hasnain Ali", role: "Customs Lead", bio: "Former carrier planner focused on schedule reliability." },
    mohsin: { name: "Mohsin Ali", role: "Project Cargo", bio: "Heavy lift specialist for energy and EPC clients." }
  },
  services: {
    "freight-forwarding": { title: "Freight Forwarding", summary: "Harborline coordinates your shipment from origin booking through delivery, with one accountable team and clear milestones." },
    "air-freight": { title: "Air Freight", summary: "When deadlines matter, our air desk secures capacity and keeps documentation aligned with airline cut-offs." },
    "ocean-freight": { title: "Ocean Freight", summary: "Cost-effective ocean solutions with proactive schedule monitoring and transshipment visibility." },
    "customs-clearance": { title: "Customs Clearance", summary: "We prepare declarations, manage duties and keep your cargo moving through border controls." },
    "vessel-chartering": { title: "Vessel Chartering", summary: "Our charter desk matches cargo profiles with suitable tonnage and port pairs." },
    "event-exhibition-logistics": { title: "Event & Exhibition Logistics", summary: "We deliver to venue windows, manage temporary imports and reverse logistics after show close." },
    "heavy-cargo": { title: "Heavy Cargo", summary: "Oversized and heavy units move on engineered plans with safety and compliance at the center." },
    "warehousing": { title: "Warehousing", summary: "Short and medium-term storage with pick/pack and value-added services near key hubs." },
    "relocation": { title: "Relocation", summary: "Office and commercial moves with careful planning for downtime and asset tracking." }
  },
  jobs: {
    "ops-coordinator": { title: "Operations Coordinator", type: "Full-time", summary: "Coordinate shipments, carriers and client updates across air and ocean desks." },
    "customs-specialist": { title: "Customs Specialist", type: "Full-time", summary: "Prepare accurate declarations and manage inspections for import clients." },
    "project-cargo-lead": { title: "Project Cargo Lead", type: "Full-time", summary: "Lead heavy lift moves including surveys, permits and vendor management." }
  },
  caseStudies: {
    "middle-east-exhibition-stand": { title: "Middle East exhibition stand delivery", cargoType: "Exhibition materials", excerpt: "Delivering a full stand build to a strict venue window during peak show season." },
    "offshore-module-delivery": { title: "Offshore module delivery", cargoType: "Heavy project cargo", excerpt: "Moving an oversized module from fabrication yard to port with road permits." }
  },
  gallery: {
    "1": { title: "Container terminal operations" },
    "2": { title: "Free-zone warehouse" },
    "3": { title: "Air cargo build-up" },
    "4": { title: "Heavy lift planning" },
    "5": { title: "Exhibition inbound" },
    "6": { title: "Ocean freight loading" }
  }
};

const ar = {
  team: {
    zoya: { name: "زويا فلك", role: "المدير العام", bio: "3 سنوات خبرة في التكنولوجيا، تتعامل مع الطلبات." },
    ashique: { name: "عاشق علي", role: "الشحن والخدمات اللوجستية", bio: "20 عاماً في الشحن الإقليمي والامتثال." },
    hasnain: { name: "حسنين علي", role: "قائد الجمارك", bio: "مخطط ناقل سابق يركز على موثوقية الجدول الزمني." },
    mohsin: { name: "محسن علي", role: "شحن المشاريع", bio: "متخصص في الحمولات الثقيلة لعملاء الطاقة والهندسة والمشتريات والبناء." }
  },
  services: {
    "freight-forwarding": { title: "الشحن والنقل", summary: "نقوم بتنسيق شحنتك من الحجز في بلد المنشأ حتى التسليم، مع فريق عمل واضح الخطوات." },
    "air-freight": { title: "الشحن الجوي", summary: "عندما تهم المواعيد النهائية، نضمن لك السعة ونحافظ على المستندات متوافقة مع رحلات الطيران." },
    "ocean-freight": { title: "الشحن البحري", summary: "حلول بحرية فعالة من حيث التكلفة مع مراقبة استباقية للجدول الزمني ورؤية واضحة للشحن." },
    "customs-clearance": { title: "التخليص الجمركي", summary: "نحن نجهز الإقرارات، وندير الرسوم ونحافظ على حركة بضائعك عبر الرقابة الحدودية." },
    "vessel-chartering": { title: "تأجير السفن", summary: "يقوم فريق التأجير لدينا بمطابقة ملامح البضائع مع الحمولات المناسبة والموانئ المتوافقة." },
    "event-exhibition-logistics": { title: "لوجستيات المعارض والفعاليات", summary: "نسلم البضائع ضمن مواعيد المعارض، ندير الاستيراد المؤقت والخدمات اللوجستية العكسية بعد انتهاء العرض." },
    "heavy-cargo": { title: "الحمولات الثقيلة", summary: "تتحرك الوحدات الكبيرة والثقيلة على خطط هندسية مع وضع السلامة والامتثال في المركز." },
    "warehousing": { title: "التخزين", summary: "تخزين قصير ومتوسط المدى مع انتقاء/تعبئة وخدمات ذات قيمة مضافة بالقرب من المراكز الرئيسية." },
    "relocation": { title: "نقل الشركات", summary: "نقل المكاتب والأعمال مع تخطيط دقيق لتقليل وقت التوقف وتتبع الأصول." }
  },
  jobs: {
    "ops-coordinator": { title: "منسق العمليات", type: "دوام كامل", summary: "تنسيق الشحنات والناقلين وتحديثات العملاء عبر مكاتب الشحن الجوي والبحري." },
    "customs-specialist": { title: "أخصائي جمارك", type: "دوام كامل", summary: "إعداد بيانات جمركية دقيقة وإدارة عمليات التفتيش لعملاء الاستيراد." },
    "project-cargo-lead": { title: "قائد شحن المشاريع", type: "دوام كامل", summary: "قيادة مهام الحمولات الثقيلة بما في ذلك المسوحات والتصاريح وإدارة الموردين." }
  },
  caseStudies: {
    "middle-east-exhibition-stand": { title: "تسليم جناح عرض في الشرق الأوسط", cargoType: "مواد المعارض", excerpt: "تسليم هيكل كامل لجناح ضمن وقت ضيق للمكان خلال موسم المعارض المزدحم." },
    "offshore-module-delivery": { title: "تسليم وحدة بحرية", cargoType: "حمولات مشاريع ثقيلة", excerpt: "نقل وحدة ضخمة من ساحة التصنيع إلى الميناء بتصاريح طرق خاصة." }
  },
  gallery: {
    "1": { title: "عمليات محطة الحاويات" },
    "2": { title: "مستودع المنطقة الحرة" },
    "3": { title: "تجهيز الشحن الجوي" },
    "4": { title: "تخطيط الحمولات الثقيلة" },
    "5": { title: "واردات المعارض" },
    "6": { title: "تحميل الشحن البحري" }
  }
};

update('c:/Users/ashiq/OneDrive/Desktop/Zoyas work/Logistics/client/src/i18n/locales/en.json', en);
update('c:/Users/ashiq/OneDrive/Desktop/Zoyas work/Logistics/client/src/i18n/locales/ar.json', ar);
