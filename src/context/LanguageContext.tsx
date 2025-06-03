import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'hi' | 'kn' | 'te';

// Define translation shape
export type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// Define our translations
export const translations: Translations = {
  // Common
  'app.title': {
    en: 'TableTap',
    hi: 'टेबलटैप',
    kn: 'ಟೇಬಲ್‌ಟ್ಯಾಪ್',
    te: 'టేబుల్‌ట్యాప్',
  },
  'login.title': {
    en: 'TableTap Login',
    hi: 'टेबलटैप लॉगिन',
    kn: 'ಟೇಬಲ್‌ಟ್ಯಾಪ್ ಲಾಗಿನ್',
    te: 'టేబుల్‌ట్యాప్ లాగిన్',
  },
  'login.description': {
    en: 'Enter your credentials to access your fine dining POS system',
    hi: 'अपने फाइन डाइनिंग पीओएस सिस्टम तक पहुंचने के लिए अपना प्रमाण पत्र दर्ज करें',
    kn: 'ನಿಮ್ಮ ಫೈನ್ ಡೈನಿಂಗ್ ಪಿಒಎಸ್ ಸಿಸ್ಟಂ ಅನ್ನು ಪ್ರವೇಶಿಸಲು ನಿಮ್ಮ ರುಜುವಾತುಗಳನ್ನು ನಮೂದಿಸಿ',
    te: 'మీ ఫైన్ డైనింగ్ పీఓఎస్ సిస్టమ్‌ను యాక్సెస్ చేయడానికి మీ ఆధారాలను నమోదు చేయండి',
  },
  'login.email': {
    en: 'Email',
    hi: 'ईमेल',
    kn: 'ಇಮೇಲ್',
    te: 'ఇమెయిల్',
  },
  'login.password': {
    en: 'Password',
    hi: 'पासवर्ड',
    kn: 'ಪಾಸ್‌ವರ್ಡ್',
    te: 'పాస్‌వర్డ్',
  },
  'login.forgot': {
    en: 'Forgot password?',
    hi: 'पासवर्ड भूल गए?',
    kn: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?',
    te: 'పాస్‌వర్డ్ మర్చిపోయారా?',
  },
  'login.button': {
    en: 'Login',
    hi: 'लॉगिन',
    kn: 'लಾಗಿನ್',
    te: 'లాగిన్',
  },
  'login.logging': {
    en: 'Logging in...',
    hi: 'लॉग इन हो रहा है...',
    kn: 'ಲಾಗಿನ್ ಆಗುತ್ತಿದೆ...',
    te: 'లాగిన్ అవుతోంది...',
  },
  'login.register': {
    en: 'Don\'t have an account? Register',
    hi: 'खाता नहीं है? रजिस्टर करें',
    kn: 'ಖಾತೆ ಇಲ್ಲವೇ? ನೋಂದಾಯಿಸಿ',
    te: 'ఖాతా లేదా? నమోదు చేసుకోండి',
  },
  'login.demo': {
    en: 'Demo credentials:',
    hi: 'डेमो क्रेडेंशियल्स:',
    kn: 'ಡೆಮೋ ರುಜುವಾತುಗಳು:',
    te: 'డೆಮೋ క్రెడెన్షియల్స్:',
  },
  'login.owner': {
    en: 'Owner: owner@example.com / password123',
    hi: 'मालिक: owner@example.com / password123',
    kn: 'ಮಾಲೀಕ: owner@example.com / password123',
    te: 'యజమాని: owner@example.com / password123',
  },
  'login.manager': {
    en: 'Manager: manager@example.com / password123',
    hi: 'प्रबंधक: manager@example.com / password123',
    kn: 'ವ್ಯವಸ್ಥಾಪಕ: manager@example.com / password123',
    te: 'మేనేజర్: manager@example.com / password123',
  },
  'login.cashier': {
    en: 'Cashier: cashier@example.com / password123',
    hi: 'कैशियर: cashier@example.com / password123',
    kn: 'ಕ್ಯಾಷಿಯರ್: cashier@example.com / password123',
    te: 'క్యాಷియర్: cashier@example.com / password123',
  },
  'header.myAccount': {
    en: 'My Account',
    hi: 'मेरा खाता',
    kn: 'ನನ್ನ ಖಾತೆ',
    te: 'నా ఖాతా',
  },
  'header.logout': {
    en: 'Logout',
    hi: 'लॉगआउट',
    kn: 'ಲಾಗ್ ಔಟ್',
    te: 'లాగౌట్',
  },
  'language.english': {
    en: 'English',
    hi: 'अंग्रेज़ी',
    kn: 'ಇಂಗ್ಲೀಷ್',
    te: 'ఇంగ్లీష్',
  },
  'language.hindi': {
    en: 'Hindi',
    hi: 'हिंदी',
    kn: 'ಹಿಂದಿ',
    te: 'హిందీ',
  },
  'language.kannada': {
    en: 'Kannada',
    hi: 'कन्नड़',
    kn: 'ಕನ್ನಡ',
    te: 'కನ్ನడ',
  },
  'language.telugu': {
    en: 'Telugu',
    hi: 'तेलुगु',
    kn: 'ತೆಲುಗು',
    te: 'తెలుగు',
  },
  
  // Dashboard and Navigation
  'dashboard.title': {
    en: 'Dashboard',
    hi: 'डैशबोर्ड',
    kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    te: 'డాష్‌బోర్డ్',
  },
  'orders.title': {
    en: 'Order Management',
    hi: 'ऑर्डर प्रबंधन',
    kn: 'ಆರ್ಡರ್ ನಿರ್ವಹಣೆ',
    te: 'ఆర్డర్ నిర్వహణ',
  },
  'inventory.title': {
    en: 'Inventory Management',
    hi: 'इन्वेंटरी प्रबंधन',
    kn: 'ಸರಕು ನಿರ್ವಹಣೆ',
    te: 'ఇన్వెంటరీ నిర్వహణ',
  },
  'kitchen.title': {
    en: 'Kitchen Display',
    hi: 'किचन डिस्प्ले',
    kn: 'ಅಡಿಗೆ ಮನೆ ಪ್ರದರ್ಶನ',
    te: 'కిచెన్ డిస్‌ప్లే',
  },
  'menu.title': {
    en: 'Menu Management',
    hi: 'मेनू प्रबंधन',
    kn: 'ಮೆನು ನಿರ್ವಹಣೆ',
    te: 'మెనూ నిర్వహణ',
  },
  'crm.title': {
    en: 'Customer Relationship Management',
    hi: 'ग्राहक संबंध प्रबंधन',
    kn: 'ಗ್ರಾಹಕ ಸಂಬಂಧ ನಿರ್ವಹಣೆ',
    te: 'కస్టమర్ రిలేషన్‌షిప్ మేనేజ్‌మెంట్',
  },
  'analytics.title': {
    en: 'Analytics & Reports',
    hi: 'एनालिटिक्स और रिपोर्ट',
    kn: 'ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ವರದಿಗಳು',
    te: 'అనలిటిక్స్ & రిపోర్ట్స్',
  },
  'staff.title': {
    en: 'Staff Management',
    hi: 'स्टाफ प्रबंधन',
    kn: 'ಸಿಬ್ಬಂದಿ ನಿರ್ವಹಣೆ',
    te: 'స్టాఫ్ నిర్వహణ',
  },
  'billing.title': {
    en: 'Billing & Payments',
    hi: 'बिलिंग और भुगतान',
    kn: 'ಬಿಲ್ಲಿಂಗ್ ಮತ್ತು ಪಾವತಿಗಳು',
    te: 'బిల్లింగ్ & పేమెంట్స్',
  },
  'settings.title': {
    en: 'Settings',
    hi: 'सेटिंग्स',
    kn: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    te: 'సెట్టింగ్‌లు',
  },
  
  // Dashboard Stats
  'stats.totalRevenue': {
    en: 'Total Revenue',
    hi: 'कुल राजस्व',
    kn: 'ಒಟ್ಟು ಆದಾಯ',
    te: 'మొత్తం ఆదాయం',
  },
  'stats.ordersToday': {
    en: 'Orders Today',
    hi: 'आज के ऑर्डर',
    kn: 'ಇಂದಿನ ಆರ್ಡರ್‌ಗಳು',
    te: 'నేటి ఆర్డర్లు',
  },
  'stats.avgOrderValue': {
    en: 'Avg. Order Value',
    hi: 'औसत ऑर्डर मूल्य',
    kn: 'ಸರಾಸರಿ ಆರ್ಡರ್ ಮೌಲ್ಯ',
    te: 'సగటు ఆర్డర్ విలువ',
  },
  'stats.onlineCustomers': {
    en: 'Online Customers',
    hi: 'ऑनलाइन ग्राहक',
    kn: 'ಆನ್‌ಲೈನ್ ಗ್ರಾಹಕರು',
    te: 'ఆన్‌లైన్ కస్టమర్లు',
  },
  'stats.fromLastWeek': {
    en: 'from last week',
    hi: 'पिछले हफ्ते से',
    kn: 'ಕಳೆದ ವಾರದಿಂದ',
    te: 'గత వారం నుండి',
  },
  
  // Inventory
  'inventory.items': {
    en: 'Inventory Items',
    hi: 'इन्वेंटरी आइटम',
    kn: 'ಸರಕು ವಸ್ತುಗಳು',
    te: 'ఇన్వెంటరీ ఐటెమ్స్',
  },
  'inventory.suppliers': {
    en: 'Suppliers',
    hi: 'सप्लायर्स',
    kn: 'ಪೂರೈಕೆದಾರರು',
    te: 'సప్లయర్లు',
  },
  'inventory.lowStock': {
    en: 'Low Stock',
    hi: 'कम स्टॉक',
    kn: 'ಕಡಿಮೆ ಸ್ಟಾಕ್',
    te: 'తక్కువ స్టాక్',
  },
  'inventory.reports': {
    en: 'Reports',
    hi: 'रिपोर्ट',
    kn: 'ವರದಿಗಳು',
    te: 'రిపోర్ట్స్',
  },
  'inventory.addInventory': {
    en: 'Add Inventory',
    hi: 'इन्वेंटरी जोड़ें',
    kn: 'ಸರಕು ಸೇರಿಸಿ',
    te: 'ఇన్వెంటరీ జోడించండి',
  },
  'inventory.search': {
    en: 'Search inventory...',
    hi: 'इन्वेंटरी खोजें...',
    kn: 'ಸರಕು ಹುಡುಕಿ...',
    te: 'ఇన్వెంటరీ వెతకండి...',
  },
  'inventory.itemName': {
    en: 'Item Name',
    hi: 'आइटम का नाम',
    kn: 'ವಸ್ತುವಿನ ಹೆಸರು',
    te: 'ఐటెమ్ పేరు',
  },
  'inventory.category': {
    en: 'Category',
    hi: 'श्रेणी',
    kn: 'ವರ್ಗ',
    te: 'వర్గం',
  },
  'inventory.quantity': {
    en: 'Quantity',
    hi: 'मात्रा',
    kn: 'ಪ್ರಮಾಣ',
    te: 'పరిమాణం',
  },
  'inventory.supplier': {
    en: 'Supplier',
    hi: 'सप्लायर',
    kn: 'ಪೂರೈಕೆದಾರ',
    te: 'సప్లయర్',
  },
  'inventory.status': {
    en: 'Status',
    hi: 'स्थिति',
    kn: 'ಸ್ಥಿತಿ',
    te: 'స్థಿతి',
  },
  
  // Staff
  'staff.staffList': {
    en: 'Staff List',
    hi: 'स्टाफ सूची',
    kn: 'ಸಿಬ್ಬಂದಿ ಪಟ್ಟಿ',
    te: 'స్టాఫ్ జాబితా',
  },
  'staff.addStaff': {
    en: 'Add Staff',
    hi: 'स्टाफ जोड़ें',
    kn: 'ಸಿಬ್ಬಂದಿ ಸೇರಿಸಿ',
    te: 'స్టాఫ్‌ని జోడించండి',
  },
  'staff.attendance': {
    en: 'Attendance',
    hi: 'उपस्थिति',
    kn: 'ಹಾಜರಾತಿ',
    te: 'హాజరు',
  },
  'staff.payroll': {
    en: 'Payroll',
    hi: 'वेतन',
    kn: 'ಸಂಬಳ ಪಟ್ಟಿ',
    te: 'జీతాల జాబితా',
  },
  
  // Billing
  'billing.createBill': {
    en: 'Create Bill',
    hi: 'बिल बनाएं',
    kn: 'ಬಿಲ್ ರಚಿಸಿ',
    te: 'బిల్లు సృష్టించండి',
  },
  'billing.payments': {
    en: 'Payments',
    hi: 'भुगतान',
    kn: 'ಪಾವತಿಗಳು',
    te: 'చెల్లింపులు',
  },
  'billing.invoices': {
    en: 'Invoices',
    hi: 'चालान',
    kn: 'ಇನ್‌ವಾಯ್ಸ್‌ಗಳು',
    te: 'ఇన్వాయిస్‌లు',
  },
  'billing.refunds': {
    en: 'Refunds',
    hi: 'रिफंड',
    kn: 'ಮರುಪಾವತಿಗಳು',
    te: 'రీఫండ్లు',
  },
  'billing.taxSettings': {
    en: 'Tax Settings',
    hi: 'टैक्स सेटिंग्स',
    kn: 'ತೆರಿಗೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    te: 'పన్ను సెట్టింగ్‌లు',
  },
  
  // Menu Management
  'menu.items': {
    en: 'Menu Items',
    hi: 'मेनू आइटम',
    kn: 'ಮೆನು ಐಟಂಗಳು',
    te: 'మెనూ ఐటెమ్స్',
  },
  'menu.addNew': {
    en: 'Add New Item',
    hi: 'नया आइटम जोड़ें',
    kn: 'ಹೊಸ ಐಟಂ ಸೇರಿಸಿ',
    te: 'కొత్త ఐటెమ్‌ని జోడించండి',
  },
  'menu.categories': {
    en: 'Categories',
    hi: 'श्रेणियां',
    kn: 'ವರ್ಗಗಳು',
    te: 'వర్గాలు',
  },
  'menu.combos': {
    en: 'Combos & Bundles',
    hi: 'कॉम्बो और बंडल',
    kn: 'ಕಾಂಬೋಗಳು ಮತ್ತು ಬಂಡಲ್‌ಗಳು',
    te: 'కಾಂबೋలు & బండిల్స్',
  },
  
  // CRM
  'crm.customers': {
    en: 'Customers',
    hi: 'ग्राहक',
    kn: 'ಗ್ರಾಹಕರು',
    te: 'కస్టమర్లు',
  },
  'crm.transactions': {
    en: 'Transactions',
    hi: 'लेनदेन',
    kn: 'ವಹಿವಾಟುಗಳು',
    te: 'లావాదేవీలు',
  },
  'crm.loyalty': {
    en: 'Loyalty',
    hi: 'लॉयल्टी',
    kn: 'ನಿಷ್ಠೆ',
    te: 'లాయల్టీ',
  },
  'crm.communication': {
    en: 'Communication',
    hi: 'संचार',
    kn: 'ಸಂವಹನ',
    te: 'కమ్యూనికేషన్',
  },
  'crm.marketing': {
    en: 'Marketing',
    hi: 'मार्केटिंग',
    kn: 'ಮಾರ್ಕೆಟಿಂಗ್',
    te: 'మార్కెటింగ్',
  },
  'crm.feedback': {
    en: 'Feedback',
    hi: 'प्रतिक्रिया',
    kn: 'ಪ್ರತಿಕ್ರಿಯೆ',
    te: 'ఫీడ్‌బ్యాక్',
  },
  
  // Common Actions
  'action.search': {
    en: 'Search',
    hi: 'खोज',
    kn: 'ಹುಡುಕಿ',
    te: 'వెతకండి',
  },
  'action.filter': {
    en: 'Filter',
    hi: 'फ़िल्टर',
    kn: 'ಫಿಲ್ಟರ್',
    te: 'ఫిల్టర్',
  },
  'action.add': {
    en: 'Add',
    hi: 'जोड़ें',
    kn: 'ಸೇರಿಸಿ',
    te: 'జోడించు',
  },
  'action.edit': {
    en: 'Edit',
    hi: 'संपादित करें',
    kn: 'ಸಂಪಾದಿಸಿ',
    te: 'సవరించు',
  },
  'action.delete': {
    en: 'Delete',
    hi: 'हटाएं',
    kn: 'ಅಳಿಸಿ',
    te: 'తొలగించు',
  },
  'action.save': {
    en: 'Save',
    hi: 'सहेजें',
    kn: 'ಉಳಿಸಿ',
    te: 'సేవ్ చేయి',
  },
  'action.cancel': {
    en: 'Cancel',
    hi: 'रद्द करें',
    kn: 'ರದ್ದುಮಾಡಿ',
    te: 'రద్దు చేయి',
  },
  'action.goBack': {
    en: 'Go Back',
    hi: 'वापस जाएं',
    kn: 'ಹಿಂದೆ ಹೋಗಿ',
    te: 'వెనక్కి వెళ్ళు',
  },
  'action.viewAll': {
    en: 'View All',
    hi: 'सभी देखें',
    kn: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
    te: 'అన్నీ చూడండి',
  },
  'coming_soon': {
    en: 'Coming Soon',
    hi: 'जल्द आ रहा है',
    kn: 'ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ',
    te: 'త్వరలో వస్తుంది',
  },
};

// Define context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Create a provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get language from localStorage, default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key]['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
