# 07 — Component Architecture

## Nhóm component

### Navigation
SiteHeader, MobileNavigation, Breadcrumb, NextCaseStudyNavigation, SiteFooter.

### Editorial Layout
EditorialHero, StatementBand, SectionHeader, EditorialDivider, Prose, TableOfContents.

### Content
ArticleList/ArticleCard, FeaturedArticle, CapabilityIndex, ExperiencePanel, FrameworkPanel, MetricBlock, Tag/TopicPill, ArticleMeta, AuthorBio, Callout.

### Case Study
CaseStudyRow, FeaturedCaseStudy, CaseStudyMetricGroup, CaseStudyMedia, FrameworkPanel, NextCaseStudyNavigation.

### Conversion
WorkWithMePanel, ContactPanel, ContactForm, Button, StatusMessage.

### Base UI
Button, Link, Tag, FormField, StatusMessage, EmptyState.

## Radius contract

Radius gắn **archetype** (control · card · panel · signature · pill), không gắn tùy ý theo section. **Giá trị canonical chốt theo D49 (contract R3) ở `COMPONENT_INVENTORY.md §B.4`** — file này không lặp số. Nguyên tắc: không bo toàn bộ section, không nested rounded card, không capsule mọi button, tối đa 1–2 signature-radius object mỗi trang.

## Quy tắc

- Component sinh từ nội dung và route thật.
- Không dùng một ContentCard chung cho mọi nội dung.
- Không nested rounded card, bo mọi section, capsule mọi button hoặc icon-in-every-card.
- Mỗi component phải có purpose, required content, allowed surfaces, radius level, variants, states, responsive behavior và accessibility.
