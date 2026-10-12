import React, { createContext, useContext, useEffect, useState } from 'react';
import { CMSData } from '../types/cms';
import { initialCMSData } from '../data/initialData';
import { isFirebaseConfigured } from '../lib/firebase/config';

// مكتبات Firebase ثقيلة (مئات الكيلوبايت)، لذلك تُحمَّل بعد ظهور الصفحة وليس قبلها.
// الصفحة تُعرض فوراً من النسخة المحفوظة/الافتراضية ثم تُحدَّث من Firestore.
const loadFirebase = () => import('../lib/firebase/integration');

const LOCAL_STORAGE_KEY = 'kingsmen_line_cms_cache_v1';

interface CMSContextValue {
  data: CMSData;
  isLoading: boolean;
  isLiveFirebase: boolean;
  updateCMSData: (nextData: CMSData) => Promise<void>;
  refreshCMSData: () => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const CMSContext = createContext<CMSContextValue>({
  data: initialCMSData,
  isLoading: false,
  isLiveFirebase: false,
  updateCMSData: async () => {},
  refreshCMSData: async () => {},
  resetToDefaults: async () => {},
});

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as CMSData;
        if (parsed && parsed.settings && Array.isArray(parsed.products)) {
          return {
            ...initialCMSData,
            ...parsed,
            settings: {
              ...initialCMSData.settings,
              ...parsed.settings,
              theme: {
                ...initialCMSData.settings.theme!,
                ...(parsed.settings.theme || {}),
              },
              homeSections: {
                ...initialCMSData.settings.homeSections!,
                ...(parsed.settings.homeSections || {}),
              },
            },
          };
        }
      }
    } catch {
      // Ignore storage parse issues
    }
    return initialCMSData;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isLiveFirebase = isFirebaseConfigured();

  const refreshCMSData = async () => {
    setIsLoading(true);
    try {
      const { fetchPublicSiteContent } = await loadFirebase();
      const remote = await fetchPublicSiteContent();
      if (remote && remote.settings) {
        const merged: CMSData = {
          ...initialCMSData,
          ...remote,
          settings: {
            ...initialCMSData.settings,
            ...remote.settings,
            theme: {
              ...initialCMSData.settings.theme!,
              ...(remote.settings.theme || {}),
            },
            homeSections: {
              ...initialCMSData.settings.homeSections!,
              ...(remote.settings.homeSections || {}),
            },
          },
        };
        setData(merged);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
        } catch {
          // Ignore storage quota issues
        }
      }
    } catch (err) {
      // تعذر تحميل مكتبة Firebase (شبكة ضعيفة): يبقى الموقع يعمل بالنسخة الحالية
      console.warn('Could not load live site content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCMSData();
  }, []);

  const updateCMSData = async (nextData: CMSData) => {
    const stamped: CMSData = {
      ...nextData,
      updatedAt: new Date().toISOString(),
    };
    // الحفظ في السحابة أولاً: إذا فشل يُرمى الخطأ للوحة التحكم ولا نعرض للمالك
    // نسخة محلية توهمه بأن التعديل نُشر للزوار.
    if (isLiveFirebase) {
      const { savePublicSiteContent } = await loadFirebase();
      await savePublicSiteContent(stamped);
    }
    setData(stamped);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stamped));
    } catch {
      // Ignore local cache error
    }
  };

  const resetToDefaults = async () => {
    await updateCMSData(initialCMSData);
  };

  const theme = data.settings.theme || initialCMSData.settings.theme!;

  const dynamicThemeCss = `
    :root {
      --color-black: ${theme.primaryBg};
      --color-soft-black: ${theme.surfaceBg};
      --color-white: ${theme.textPrimary};
      --color-gold: ${theme.accentGold};
      --color-light-gold: ${theme.accentLightGold};
      --color-muted-gray: ${theme.textMuted};
    }
    html, body, .bg-\\[\\#090909\\] { background-color: ${theme.primaryBg} !important; }
    .bg-\\[\\#111111\\] { background-color: ${theme.surfaceBg} !important; }
    .text-\\[\\#C9A24A\\] { color: ${theme.accentGold} !important; }
    .bg-\\[\\#C9A24A\\] { background-color: ${theme.accentGold} !important; }
    .border-\\[\\#C9A24A\\] { border-color: ${theme.accentGold} !important; }
    .text-\\[\\#E0C878\\] { color: ${theme.accentLightGold} !important; }
    .text-\\[\\#F7F7F5\\] { color: ${theme.textPrimary} !important; }
    .text-\\[\\#A3A3A3\\] { color: ${theme.textMuted} !important; }
  `;

  return (
    <CMSContext.Provider
      value={{
        data,
        isLoading,
        isLiveFirebase,
        updateCMSData,
        refreshCMSData,
        resetToDefaults,
      }}
    >
      <style>{dynamicThemeCss}</style>
      {children}
    </CMSContext.Provider>
  );
};

export function useCMS() {
  return useContext(CMSContext);
}
