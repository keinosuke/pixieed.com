<?php
// 言語判定とページ表示
function detectLanguage()
{
    $lang = 'ja'; // デフォルトは日本語

    // 特定IPアドレスをチェック
    $english_ips = [
        // 開発・テスト用IPアドレス（例）
        '192.168.1.100',
        '10.0.0.1',
        '127.0.0.1',
        // 海外からのアクセス例
        '1.1.1.1',
        '8.8.8.8',
        // 指定IPアドレス（英語表示）
        '123.21.226.204',    // duy
        '162.43.11.71',      // windows
        '210.155.199.11',    // First Sendai
        '18.177.28.52',      // pass
        '13.231.11.119',     // AWS
        '219.118.204.247',   // first23.com
        '163.44.177.18',     // coreserver
        '14.9.17.32',        // saito
        '133.205.118.93',    // takahashi
        '54.86.50.139',      // postman
        '18.178.38.182',     // dbz
        '162.43.120.158',    // XSERVER(first23.online 古屋・花ラボ)
        '157.107.91.243',    // TAKEI
        '14.192.44.194',     // Valor VPN
        '116.222.67.111',    // 関西
        '61.203.131.134',    // 大宮
        '119.106.110.133',   // shioya
        '106.146.5.144',     // sugawara
    ];

    $client_ip = getClientIP();

    // 特定IPの場合は英語
    if (in_array($client_ip, $english_ips)) {
        $lang = 'en';
    }
    // ブラウザ言語が英語の場合
    else if (isEnglishBrowser()) {
        $lang = 'en';
    }

    return $lang;
}

// クライアントIPアドレスを取得
function getClientIP()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED'])) {
        return $_SERVER['HTTP_X_FORWARDED'];
    } elseif (!empty($_SERVER['HTTP_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_FORWARDED_FOR'];
    } elseif (!empty($_SERVER['HTTP_FORWARDED'])) {
        return $_SERVER['HTTP_FORWARDED'];
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}

// ブラウザ言語が英語かチェック
function isEnglishBrowser()
{
    if (!isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
        return false;
    }

    $accept_language = $_SERVER['HTTP_ACCEPT_LANGUAGE'];

    // Accept-Languageヘッダーをパース
    $languages = [];
    if (preg_match_all('/([a-z]{1,8}(?:-[a-z]{1,8})?)(?:;q=([0-9.]+))?/i', $accept_language, $matches)) {
        $languages = array_combine($matches[1], $matches[2]);

        // qの値がない場合は1.0として扱う
        foreach ($languages as $lang => $q) {
            if ($q === '') {
                $languages[$lang] = 1.0;
            } else {
                $languages[$lang] = floatval($q);
            }
        }

        // qの値でソート（降順）
        arsort($languages);
    }

    // 最優先言語が英語系かチェック
    foreach ($languages as $lang => $q) {
        $lang_code = strtolower(substr($lang, 0, 2));
        if ($lang_code === 'en') {
            return true;
        }
        // 最初の言語のみチェック（最優先）
        break;
    }

    return false;
}

// 言語を判定
$lang = detectLanguage();
// 言語に応じてコンテンツを出力
$isEnglish = ($lang === 'en');

// キャッシュバスター - ファイル更新時刻ベース
function getAssetVersion($file)
{
    $filepath = __DIR__ . '/' . $file;
    return file_exists($filepath) ? filemtime($filepath) : time();
}
?>
<!DOCTYPE html>
<html lang="<?php echo $isEnglish ? 'en' : 'ja'; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no, address=no, email=no">
    <title><?php echo $isEnglish ? 'Pixieed Inc. - Technology that amplifies human potential' : 'Pixieed - ピクシード株式会社'; ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.min.css?v=<?php echo getAssetVersion('assets/css/style.min.css'); ?>">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9REPPHR8LE"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-9REPPHR8LE');
    </script>
</head>

<body>
    <div class="background-animation" id="backgroundAnimation"></div>

    <!-- Header with Horizontal Logo -->
    <header class="main-header">
        <div class="logo-container-horizontal">
            <img src="assets/img/logo_horizonal.svg" alt="Pixieed" class="horizontal-logo">
        </div>
        <div class="header-tagline">
            <div class="tagline" id="tagline"></div>
        </div>
    </header>

    <main class="content-horizontal">

        <!-- Mission Statement -->
        <section class="hero-mission">
            <div class="mission-container">
                <p class="mission-statement-large">
                    <?php if ($isEnglish): ?>
                        <span class="mission-line-1">From tiny sparks to</span><span class="mission-line-2"> great transformations,</span><br class="mission-break-desktop">
                        <span class="mission-line-3">technology that amplifies</span><span class="mission-line-4"> human potential.</span>
                    <?php else: ?>
                        <span class="mission-line-1">些細なひらめきから</span><span class="mission-line-2">大きな変革へ、</span><br class="mission-break-desktop">
                        <span class="mission-line-3">人間の可能性を拡張する</span><span class="mission-line-4">テクノロジー。</span>
                    <?php endif; ?>
                </p>
            </div>
        </section>

        <!-- Three Column Layout -->
        <div class="three-columns">

            <!-- Services Column -->
            <div class="column services-column">
                <h2 class="column-title"><?php echo $isEnglish ? 'What We Do' : '私たちができること'; ?></h2>
                <div class="services-list-horizontal">
                    <?php if ($isEnglish): ?>
                        <div class="service-item-h">Business Process Improvement</div>
                        <div class="service-item-h">Digital Transformation Consulting</div>
                        <div class="service-item-h">AI-Powered Problem Solving</div>
                        <div class="service-item-h">Legacy System Modernization</div>
                        <div class="service-item-h">Custom Solution Development</div>
                    <?php else: ?>
                        <div class="service-item-h">業務効率化・改善</div>
                        <div class="service-item-h">DXコンサルティング</div>
                        <div class="service-item-h">AI活用による課題解決</div>
                        <div class="service-item-h">レガシーシステムの現代化</div>
                        <div class="service-item-h">オーダーメイドソリューション</div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Leadership Column -->
            <div class="column leadership-column">
                <h2 class="column-title"><?php echo $isEnglish ? 'CEO Profile' : '代表者経歴'; ?></h2>
                <div class="profile-info-h">
                    <div class="profile-image-container">
                        <img src="assets/img/saito.jpg" alt="<?php echo $isEnglish ? 'Keinosuke Saito' : '齊藤 京之介'; ?>" class="profile-image">
                    </div>
                    <span class="profile-role-h"><?php echo $isEnglish ? 'Technical Director / Founder' : 'テクニカルディレクター'; ?></span>
                    <h3 class="profile-name-h"><?php echo $isEnglish ? 'Keinosuke Saito' : '齊藤 京之介'; ?></h3>
                    <p class="profile-bio-h">
                        <?php if ($isEnglish): ?>
                            Born in Sendai, Miyagi. Started programming as a student, creating Windows applications. Over 20+ years of experience from web development team leader at design companies to IT development manager at listed companies, freelance engineer, and entrepreneur founding multiple companies including SIIK Inc. (2021) and Pixieed Inc. (2025).
                        <?php else: ?>
                            宮城県仙台市生まれ。学生時代からプログラミングを始め、Windowsアプリを開発。上場企業でのIT管理職やWindowsアプリを開発。デザイン会社でのWebデベロッパーチームリーダーを経験した後、フリーランスエンジニアとして独立。その後、いくつかの会社を設立を経て2025年、ピクシード株式会社を設立。
                        <?php endif; ?>
                    </p>

                    <div class="skills-list-h">
                        <?php if ($isEnglish): ?>
                            <span class="skill-tag">Web Development</span>
                            <span class="skill-tag">System Architecture</span>
                            <span class="skill-tag">Team Management</span>
                            <span class="skill-tag">E-commerce Solutions</span>
                            <span class="skill-tag">Enterprise Systems</span>
                        <?php else: ?>
                            <span class="skill-tag">フルスタック開発</span>
                            <span class="skill-tag">システム設計・構築</span>
                            <span class="skill-tag">UI/UXデザイン</span>
                            <span class="skill-tag">プロジェクト管理</span>
                            <span class="skill-tag">AI・自動化技術</span>
                            <span class="skill-tag">データベース設計</span>
                            <span class="skill-tag">クラウドインフラ</span>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <!-- Company Info Column -->
            <div class="column company-column">
                <h2 class="column-title"><?php echo $isEnglish ? 'Company Overview' : '会社概要'; ?></h2>
                <div class="company-details">
                    <div class="detail-group">
                        <span class="detail-label"><?php echo $isEnglish ? 'Company' : '会社名'; ?></span>
                        <span class="detail-value"><?php echo $isEnglish ? 'Pixieed Inc.' : 'ピクシード株式会社'; ?></span>
                    </div>
                    <div class="detail-group">
                        <span class="detail-label"><?php echo $isEnglish ? 'Established' : '設立'; ?></span>
                        <span class="detail-value"><?php echo $isEnglish ? 'August 2025 (Founded in 2011)' : '2025年8月　(2011年創業)'; ?></span>
                    </div>
                    <?php if (!$isEnglish): ?>
                        <div class="detail-group">
                            <span class="detail-label">代表者</span>
                            <span class="detail-value">代表取締役 齊藤京之介</span>
                        </div>
                    <?php endif; ?>
                    <div class="detail-group">
                        <span class="detail-label"><?php echo $isEnglish ? 'Address' : '所在地'; ?></span>
                        <span class="detail-value">
                            <?php if ($isEnglish): ?>
                                4F-A, Sennan Building, 11-19, Chuo 2-chome, Aoba-ku, Sendai-shi, Miyagi-ken, Japan
                            <?php else: ?>
                                〒980-0021<br>宮城県仙台市青葉区中央2-11-19<br>仙南ビル4F-A
                            <?php endif; ?>
                        </span>
                    </div>
                    <div class="detail-group">
                        <span class="detail-label"><?php echo $isEnglish ? 'Business' : '事業内容'; ?></span>
                        <span class="detail-value">
                            <?php if ($isEnglish): ?>
                                Software Development<br>& Technology Consulting
                            <?php else: ?>
                                ソフトウェア開発<br>テクノロジーコンサルティング
                            <?php endif; ?>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="horizontal-footer">
            <cite class="footer-attribution">
                <?php echo $isEnglish ? 'Pixieed Inc.' : 'Copyright &copy; 2025 Pixieed, Inc.'; ?>
            </cite>
        </footer>

    </main>
    <script src="assets/js/script.min.js?v=<?php echo getAssetVersion('assets/js/script.min.js'); ?>"></script>
</body>

</html>