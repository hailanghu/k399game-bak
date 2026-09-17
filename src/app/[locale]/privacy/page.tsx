import Link from "next/link";
import { unstable_setRequestLocale } from "next-intl/server";

export const runtime = "edge";

export default async function PrivacyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const isZh = locale === "zh";

  return (
    <main className="min-h-screen bg-dark-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center text-dark-500 hover:text-neon-400 transition-colors mb-8 text-sm"
        >
          {isZh ? "← 返回首页" : "← Back to home"}
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">
          {isZh ? "隐私政策" : "Privacy Policy"}
        </h1>
        <p className="text-dark-500 text-sm mb-10">
          {isZh ? "最后更新：2026 年 9 月 17 日" : "Last updated: September 17, 2026"}
        </p>

        <div className="space-y-8 text-dark-300 text-sm leading-relaxed">
          <Section title={isZh ? "1. 我们是谁" : "1. Who We Are"}>
            {isZh
              ? "k399game（k399game.com）是一个 100% 由人工智能生成的浏览器小游戏平台。本隐私政策说明我们如何收集、使用和保护您的信息。"
              : "k399game (k399game.com) is a platform for 100% AI-generated browser games. This Privacy Policy explains how we collect, use, and protect your information."}
          </Section>

          <Section title={isZh ? "2. 我们收集的信息" : "2. Information We Collect"}>
            {isZh
              ? "我们不要求注册，也不主动收集姓名、邮箱等个人身份信息。我们可能记录匿名的游玩统计（如游玩次数）以改进内容。游戏完全在您的浏览器中运行，不会上传您的操作数据。"
              : "We do not require registration and do not knowingly collect personally identifiable information such as names or emails. We may record anonymous play statistics (e.g. play counts) to improve our content. Games run entirely in your browser and do not upload your gameplay data."}
          </Section>

          <Section title={isZh ? "3. Cookie 与第三方广告" : "3. Cookies & Third-Party Advertising"}>
            {isZh ? (
              <>
                我们使用 Google AdSense 在本站展示广告。Google
                及其合作伙伴可能通过 Cookie 使用您的浏览历史，向您投放个性化广告。您可以通过以下方式管理广告偏好：
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    <a
                      href="https://www.google.com/settings/ads"
                      className="text-neon-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google 广告设置
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.aboutads.info/choices"
                      className="text-neon-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AboutAds 选择退出
                    </a>
                  </li>
                </ul>
                您也可以通过在浏览器设置中禁用 Cookie 来拒绝非必要 Cookie。
              </>
            ) : (
              <>
                We use Google AdSense to serve ads on this site. Google and its
                partners may use cookies based on your browsing history to serve
                personalized ads. You can manage your ad preferences here:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    <a
                      href="https://www.google.com/settings/ads"
                      className="text-neon-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Ads Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.aboutads.info/choices"
                      className="text-neon-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AboutAds Choices
                    </a>
                  </li>
                </ul>
                You can also refuse non-essential cookies by disabling them in
                your browser settings.
              </>
            )}
          </Section>

          <Section title={isZh ? "4. 儿童隐私" : "4. Children's Privacy"}>
            {isZh
              ? "我们的服务不面向 13 岁以下儿童。我们不会故意收集儿童的个人身份信息。"
              : "Our service is not directed to children under 13. We do not knowingly collect personal information from children."}
          </Section>

          <Section title={isZh ? "5. 联系我们" : "5. Contact Us"}>
            {isZh
              ? "如对本隐私政策有疑问，请通过 privacy@k399game.com 联系我们。"
              : "If you have questions about this Privacy Policy, contact us at privacy@k399game.com."}
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
