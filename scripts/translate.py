import os
import json
from openai import OpenAI
from tqdm import tqdm

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

client = OpenAI(
    # This is the default and can be omitted
    api_key='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',
)

def load_translations():
    try:
        with open('translations.db', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_translation(original_text, translated_text):
    translations[original_text] = translated_text
    with open('translations.db', 'w') as file:
        json.dump(translations, file)

def translate_to_spanish(text):
    if text in translations:
        return translations[text]

    response = client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You need to translate to spanish following sentences. Just translate them. Don't say anything else."
                    },
                    {
                        "role": "user",
                        "content": text,
                    }
                ],
                model="gpt-3.5-turbo",
                # model="gpt-3.5-turbo",
            )
    
    translated_text = response.choices[0].message.content
    save_translation(text, translated_text)
    return translated_text

not_translatable_attributes = ["id", "images"]

translations = load_translations()

with open(f'{ROOT_DIR}/../dist/exercises.json', 'r') as file:
    data = json.load(file)

for exercise in tqdm(data, total=len(data), desc="Translating exercises..."):
    for key, value in exercise.items():
        if key not in not_translatable_attributes:
            if isinstance(value, str):
                exercise[key] = translate_to_spanish(value)
            elif isinstance(value, list):
                exercise[key] = [translate_to_spanish(item) for item in value]


with open(os.path.join(ROOT_DIR, '../dist/exercises_es.json'), 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=2, ensure_ascii=False)
