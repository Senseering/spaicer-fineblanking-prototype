import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);


const messages = {
    'de': {
        "title": "Verschleißprognose beim Feinschneiden",
        "process1": "Schneiden",
        "process2": "Abstreifen",
        "prediction": "Status Vorhersage:",
        "prediction_wear": "kritischer lokaler Verschleiß prognostiziert",
        "predcition_light" : "Leichter Verschleiß",
        "prediction_global_wear" : "Globaler Verschleiß prognostiziert",
        "status_tool": "Status Werkzeug",
        "current_run": "Aktueller Lauf:",
        "action" :"Handlung empfohlen:",
        "todo1" : "Kritischer globaler Verschleiß prognostiziert. Werkzeugwartung notwendig",
        "todo2" : "Leichter globaler Verschleiß prognostiziert. Werkzeugwartung möglicherweise bald erforderlich.",
        "todo3" : " Kein Handeln notwendig",
        "prediction_a_cr": "Kritischer Verschleiß anhand des Körperschall-Signals prognostiziert",
        "prediction_ae_li":"Leichter lokaler Verschleiß anhand des Körperschall-Signals prognostiziert.",
        "tool_cr":"Kritischer Zustand des Werkzeugs prognostiziert ",
        "probability":"Wahrscheinlichkeit: 89%",                  
        "ne_action":"Notwendige Handlung:",
        "text1":"Stop der Maschine und Werkzeugwechsel (Kosten: 8.000,00 EUR)",
        "text2":"Mögliche zukünftige Handlungen:",
        "text3":"Wechsel zu Ersatzwerkzeug (Kosten: 900,00 EUR)",
        "text4":"Wechsel zu einem alternativen Produkt",
        "k1":"Kosten Produkt B (Kosten: 4.500,00 EUR)",
        "k2":"Kosten Produkt C (Kosten: 5.000,00 EUR)",
        "k3":"Kosten Produkt D (Kosten: 7.500,00 EUR)",
        "text5":"Stoppen der Maschine und Wechsel auf das Ersatzwerkzeug",
        "text6":"Geschätzte Zeit und Kosten der Empfehlung:",
        "text7": "2h, 1.000,00 EUR",
        "text8":"Produktionslinie:",
        "text9":"Qualität der aktuellen Vorhersage, basierend auf aktiven Sensoren: 0.85",
        "text10":"Status Sensor (Schneiden):",
        "text11":"Status Sensor (Schneiden):",
        "text12":"Weitere Informationen",
        "text13":"Informationen zu:",
        "text14":"Alles klar",
        "test":"Test"
    },
    'en': {
        'title': 'Wear prediction in fine blanking',
        "process1": "Blank",
        "process2": "Stripping",
        "prediction": "Status Prediction:",
        "prediction_wear": "critical local wear predicted",
        "predcition_light" : "light wear",
        "prediction_global_wear" : "Global wear predicted",
        "status_tool": "Status Tool",
         "current_run": "Current Run:",
        "action" : "Action Recommended:",
        "todo1" : "Critical global wear predicted. Tool maintenance necessary",
        "todo2" : "Slight global wear predicted. Tool maintenance may be required soon.",
        "todo3" : " No action necessary",
        "prediction_a_cr": "Critical wear predicted based on accustic emission signal",
        "prediction_ae_li": "Light local wear predicted based on accustic emission signal.",
        "tool_cr": "Critical condition of tool predicted ",
        "probability": "Probability: 89%",                  
        "ne_action": "Action required:",
        "text1": "Stop the machine and change the tool (cost: 8.000,00 EUR)",
        "text2": "Possible future actions:",
        "text3": "Change to replacement tool (cost: 900.00 EUR)",
        "text4": "Switch to alternative product",
        "k1": "Cost product B (cost: 4,500.00 EUR)",
        "k2": "Cost Product C (Cost: 5,000.00 EUR)",
        "k3": "Cost product D (cost: 7.500,00 EUR)",
        "text5": "Stopping the machine and switching to the replacement tool",
        "text6": "Estimated time and cost of recommendation:",
        "text7": "2h, 1.000,00 EUR",
        "text8": "Production line:",
        "text9": "Quality of current prediction based on active sensors: 0.85",
        "text10": "Status Sensor (Blank):",
        "text11": "Status Sensor (Blank):",
        "text12": "Additional Information",
        "text13": "Information on:",
        "text14": "All clear",
        "test":"Test"
        },
};


export default new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'de', // set fallback locale
    messages, // set locale messages
});

