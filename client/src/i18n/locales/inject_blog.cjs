const fs = require('fs');

function update(file, newData) {
  const data = JSON.parse(fs.readFileSync(file));
  data.data.blog = newData;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

const en = {
  "navigating-red-sea-reroutes": {
    "title": "Navigating Red Sea reroutes in 2026",
    "excerpt": "How shippers are balancing transit time and cost when ocean lanes shift.",
    "author": "Harborline Operations",
    "body": "Ocean carriers continue to adjust schedules across the Suez corridor. Harborline monitors sailings daily and advises clients on alternate hubs and air-sea combinations when deadlines are tight.\n\nKey steps: confirm booking cut-offs early, allow buffer at transshipment ports, and align customs documentation before cargo arrives."
  },
  "heavy-lift-planning-checklist": {
    "title": "Heavy lift planning checklist",
    "excerpt": "Five documents project cargo teams should prepare before the first quote.",
    "author": "Project Cargo Desk",
    "body": "Start with accurate weights and dimensions, lifting points, and route surveys. Share GA drawings and any permit restrictions for origin and destination.\n\nOur project desk coordinates engineering reviews, specialized equipment, and port handling windows."
  }
};

const ar = {
  "navigating-red-sea-reroutes": {
    "title": "التعامل مع تغيير مسارات البحر الأحمر في عام 2026",
    "excerpt": "كيف يوازن الشاحنون بين وقت العبور والتكلفة عند تغير المسارات البحرية.",
    "author": "عمليات هاربرلاين",
    "body": "تواصل شركات الشحن البحري تعديل جداولها عبر ممر السويس. تراقب هاربرلاين الإبحار يوميًا وتنصح العملاء بشأن المراكز البديلة والجمع بين الشحن الجوي والبحري عندما تكون المواعيد النهائية ضيقة.\n\nالخطوات الرئيسية: تأكيد مواعيد الحجز مبكرًا، والسماح بمدة إضافية في موانئ إعادة الشحن، وتجهيز الوثائق الجمركية قبل وصول البضائع."
  },
  "heavy-lift-planning-checklist": {
    "title": "قائمة التحقق من تخطيط الحمولات الثقيلة",
    "excerpt": "خمس وثائق يجب على فرق شحن المشاريع تحضيرها قبل عرض السعر الأول.",
    "author": "مكتب شحن المشاريع",
    "body": "ابدأ بأوزان وأبعاد دقيقة، ونقاط الرفع، ومسوحات المسار. شارك رسومات الترتيب العام وأي قيود تصاريح للمنشأ والوجهة.\n\nيقوم مكتب المشاريع لدينا بتنسيق المراجعات الهندسية، والمعدات المتخصصة، ونوافذ المناولة في الميناء."
  }
};

update('c:/Users/ashiq/OneDrive/Desktop/Zoyas work/Logistics/client/src/i18n/locales/en.json', en);
update('c:/Users/ashiq/OneDrive/Desktop/Zoyas work/Logistics/client/src/i18n/locales/ar.json', ar);
