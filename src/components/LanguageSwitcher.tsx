import flagCn from '@/assets/icons/ic-flag-cn.svg';
import flagEn from '@/assets/icons/ic-flag-en.svg';
import flagVi from '@/assets/icons/ic-flag-vi.svg';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Col, Dropdown, Row } from 'antd';
import { useState } from 'react';

type LangCode = 'vi' | 'en' | 'cn';

const getLanguageLabel = (lang: LangCode) => {
    if (lang === 'vi') return 'Tiếng Việt';
    if (lang === 'en') return 'English';
    return '中文';
};

const getFlagSrc = (lang: LangCode) => {
    if (lang === 'vi') return flagVi;
    if (lang === 'en') return flagEn;
    return flagCn;
};

export const LanguageSwitcher = () => {
    const [language, setLanguage] = useState<LangCode>('vi');

    const handleChangeLanguage = (lang: LangCode) => {
        setLanguage(lang);
        // TODO: Tích hợp i18n tại đây (ví dụ: i18next.changeLanguage(lang))
        console.log('Đổi ngôn ngữ sang:', lang);
    };

    const languageMenuItems: MenuProps['items'] = (['vi', 'cn', 'en'] as const)
        .filter((code) => code !== language)
        .map((code) => ({
            key: code,
            label: (
                <span className="flex items-center gap-2">
                    <img
                        src={getFlagSrc(code)}
                        alt={getLanguageLabel(code)}
                        className="w-4 h-4"
                    />
                    <span>{getLanguageLabel(code)}</span>
                </span>
            ),
            onClick: () => handleChangeLanguage(code),
        }));

    return (
        <Row align="middle" gutter={[16, 16]}>
            <Col className="mr-10">
                <Dropdown
                    menu={{ items: languageMenuItems }}
                    trigger={['click']}
                    arrow
                    placement="bottomCenter"
                    className="w-full"
                >
                    <Button
                        type="text"
                        icon={
                            <span className="flex items-center gap-1">
                                <img
                                    src={getFlagSrc(language)}
                                    alt={getLanguageLabel(language)}
                                    className="w-10 h-5"
                                />
                                <DownOutlined style={{ fontSize: 10, color: '#ffffff' }} />
                            </span>
                        }
                        style={{ padding: 0, height: 'auto' }}
                    />
                </Dropdown>
            </Col>
        </Row>
    );
};

export default LanguageSwitcher;


