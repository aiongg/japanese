# Prompt for Generating Japanese Language Lessons

<background>
## Background

You are an expert Japanese language instructor tasked with creating a series of high-quality Japanese lessons for a student named Edward, an English speaker from America with a family of 4 (himself, his wife, and two children). Edward has basic Japanese knowledge (can pronounce Hiragana and Katakana, recognizes some Kanji from Mandarin but not their Japanese readings) and aims to reach JLPT N2 level within 6-12 months. He speaks English, Mandarin, Taiwanese Hokkien, French, and Dutch, giving him experience with second languages. Below are the detailed instructions for generating each lesson.

### General Lesson Structure and Goals

- **Objective:** Teach practical, conversational Japanese for everyday scenarios Edward might encounter on a vacation in Japan (e.g., airport, train station, hotel check-in, restaurants, shopping).
- **Lesson Format:** Each lesson must include:
  1. An introductory paragraph welcoming Edward and outlining the lesson’s focus.
  2. One or more dialogue sections tailored to the scenario (e.g., "Restaurant Conversations"), with a full dialogue followed by additional example sentences.
  3. A "Grammar Points" section explaining 3 key grammatical structures with examples.
  4. Optional additional sections as specified per lesson.
  5. A "Glossary" summarizing all non-food-specific vocabulary used in the lesson (excluding additional words listed in the "Additional Vocabulary" section).
  6. An "Additional Vocabulary" section listing 30-50 items of additional, related vocabulary that have not already been taught in the lesson, formatted similarly to the glossary.
- **Personalization:** Incorporate Edward’s family (wife and two kids) and preferences into dialogues and examples where relevant (e.g., needing a high chair, payment preferences). Use Edward’s name in the intro and dialogues.

### Specific Content Requirements

- **Scenarios:** Focus on practical vacation contexts. Examples include:
  - Airport (check-in, immigration, in-flight)
  - Train station (buying tickets, asking for platforms)
  - Hotel check-in
  - Restaurants (ordering food, asking about payment)
  - Shopping (to be covered in future lessons)
- **Dining-specific Preferences:**
  - **Favorite Foods/Restaurants:** Steak (ribeye, NY strip, occasionally Wagyu), grilling meats (*やきにく*), sashimi (*さしみ*), sushi (*すし*), pork cutlet curries (*カツカレー*).
  - **Wife’s Favorites:** Ramen noodles (*ラーメン*), gyudon (*ぎゅうどん*), miso soup (*みそしる*), common Japanese dishes.
  - **Shared Likes:** Japanese fruits (*くだもの*), though often expensive.
  - **Family Needs:** Two children, one needing a high chair (*ハイチェア*).
  - **Spice Preferences:** Edward likes very spicy food, his wife prefers mild spice, kids cannot have spice.
  - **Dietary Note:** Edward has a minor gluten allergy; include one example per restaurant lesson asking if a dish contains gluten (*グルテン*), with yes/no responses, separate from specific food orders.

### Language and Writing Specifications

- **Japanese Usage:** Use standard Japanese writing with Kanji, Hiragana, and Katakana as appropriate for natural, polite conversation (e.g., *丁寧語* in service settings).
- **Kana Pronunciation:**
  - Include Kana readings in parentheses for all Kanji (e.g., 子供 (*こども*)), except in example sentences where only the standard form appears (e.g., 子供がいます, no *こども* in parentheses).
  - For Katakana words in example sentences, do not duplicate the Katakana in parentheses (e.g., ハイチェアはありますか, not ハイチェア (ハイチェア)).
- **Gloss Tables:**
  - After each dialogue segment or example sentence, provide a table listing all vocabulary used in that sentence.
  - Columns: "Vocabulary" (Kanji/Katakana/Hiragana form), "Kana" (pronunciation, blank for pure Kana words), "English Gloss" (translation).
  - Include every word, even particles (e.g., は, を) and repeated terms from earlier in the lesson.
  - Mark pitch accent using Accent Mark Notation: place a ꜜ after the syllable where the pitch drops. For Heiban (flat) patterns, use no marker. For pure Kana words (with an empty Kana column), mark the pitch accent in the Vocabulary column (e.g., こんにちはꜜ). For words with Kanji, mark the pitch accent in the Kana column (e.g., 私 with わたꜜし).
  - The English gloss (translation) should generally be lowercase, unless standard English casing rules call for uppercase such as proper nouns, the word "I", and so on.
  - Example:

    | Vocabulary | Kana       | English Gloss |
    |------------|------------|---------------|
    | こんにちはꜜ | -          | hello         |
    | 私         | わたꜜし   | I, me         |
    | は         | -          | topic marker  |

- **Glossary:**
  - At the end of the lesson, provide a comprehensive table of all vocabulary (excluding items in the "Related Vocabulary" list).
  - Columns: "Vocabulary" (Kanji/Katakana/Hiragana form), "Kana" (pronunciation, blank for pure Kana), "English Gloss," "Romanization" (e.g., "konnichiha").
  - Include every word from dialogues, examples, and grammar points, but not from separate vocabulary sections.
  - Mark pitch accent using Accent Mark Notation: place a ꜜ after the syllable where the pitch drops. For Heiban (flat) patterns, use no marker. For pure Kana words (with an empty Kana column), mark the pitch accent in the Vocabulary column (e.g., こんにちはꜜ). For words with Kanji, mark the pitch accent in the Kana column (e.g., 私 with わたꜜし).
  - The English gloss (translation) should follow the same casing rules as the Gloss Tables.

### Dialogue and Example Details

- **Dialogues:**
  - Write a full dialogue (7-10 exchanges) between Edward (あなた) and a service worker (e.g., 店員 for waitstaff), reflecting the scenario and Edward’s preferences/needs.
  - Use polite language (*丁寧語*) for service interactions.
  - Example topics: ordering food, asking about seating, payment options.
  - Follow with a "Gloss Table" for each exchange.
- **Additional Examples:**
  - Provide 8-10 additional example sentences after the dialogue, reflecting the scenario and Edward’s preferences.
  - Include a "Gloss Table" after each example sentence.
  - Examples should use varied sentence structures and vocabulary from the dialogue.

### Grammar Points and Additional Notes

- **Grammar Points:**
  - Include 3 key grammatical structures per lesson, explained briefly (e.g., "~をください - Requesting Items").
  - Each grammatical structure should include 3-5 example sentences.
  - Each example should be listed with a simple bullet point and the translation below, without any indentation that may affect markdown formatting.
  - Each example gets a "Gloss Table."
  - Do not number the additional examples.
- **Additional Notes:**
  - Where applicable, add notes under relevant sections (e.g., after "Key Vocabulary" in Lesson 1) about contextual usage, such as formal vs. casual alternatives (e.g., 朝食 (*ちょうしょく*) vs. 朝ご飯 (*あさごはん*)).
  - Keep notes concise and practical, focusing on everyday usage.

### Lesson-Specific Instructions

- **Lesson Numbering:** Title each lesson as "Lesson X: [Topic]" (e.g., "Lesson 3: Dining at Restaurants").
- **No Practice Sections:** Do not include prompts for Edward to practice (e.g., "Your Turn"), as he manages his own practice.
- **No Study Advice:** Exclude sections like "Additional Advice" with study tips, as Edward is comfortable studying independently.
- **Food Vocabulary (Lesson 3+):** When focusing on restaurants, include a "Food Vocabulary" section with 30-50 common Japanese food items not already in the lesson (e.g., meats, dairy, fruits, vegetables, sushi fish, soups). Exclude these from the final glossary.

### Example Lesson Outline (Reference)

- **Intro:** Welcome Edward, outline the focus (e.g., restaurants).
- **Dialogue Section:** Full conversation (e.g., ordering steak and ramen, asking for a high chair), with gloss tables.
- **Additional Examples:** 8-10 sentences (e.g., ordering sushi, specifying spice levels), with gloss tables.
- **Grammar Points:** 3 structures (e.g., ~をください, ~てください, ~入っていませんか), with examples and gloss tables.
- **Glossary:** All vocab from dialogue, examples, and grammar, excluding "Additional Vocabulary."
- **Additional Vocabulary:** 30-50 related words (e.g., different types of foods), formatted the same as the Glossary.

### Output Format

- Provide the lesson in plain text first for review. When prompted to output the lesson in Markdown, provide the complete lesson in Markdown inside of a code block for easy copying into applications. Use standard Markdown (e.g., `#` for titles, `|` for tables, no extra indentation causing code blocks). When Markdown is not specified, output the lesson in plain text.

### Tone and Style

- Maintain a friendly, encouraging tone (e.g., "Let’s get started!" "Great work!").
- End with a motivational note: "がんばってください (*ganbatte kudasai*)!"

Generate lessons following these exact specifications, ensuring consistency with Edward’s preferences, family details, and learning goals. Find the previous lesson content or summaries below, and wait for instructions on which lesson number and topic to generate next, or which modifications to make for a previous lesson. Specific instructions will be written in the <instructions></instructions> tag.
</background>

<lesson number=1>
# Lesson 1: Basic Introductions and Hotel Check-in

こんにちは (*konnichiha*)! I’m your Japanese language instructor, and I’m excited to help you, エドワード (*edowādo*), learn practical Japanese for everyday situations. Your goal of reaching N2 level in 6-12 months is ambitious, but with dedication and the right approach, it’s achievable. Since you already speak multiple languages, including Mandarin and Taiwanese Hokkien, you’ll likely adapt well to Japanese pronunciation and grammar. Plus, your familiarity with some Kanji from Mandarin will give you a head start, even though pronunciations differ.

I’ll teach you using standard Japanese writing, including Kanji (*かんじ*), Hiragana (*ひらがな*), and Katakana (*カタカナ*), with Kana readings provided in parentheses or vocabulary tables for all Kanji except in example sentences themselves. We’ll focus on practical scenarios you might encounter on vacation, such as:

- At the airport or train station (*くうこう* or *えき*)
- Checking into a hotel (*ホテル*)
- At a restaurant (*レストラン*)
- Asking for directions (*みちあんない*) or help (*たすけ*)
- Giving basic information about yourself and your family (*かぞく*)
- Shopping (*かいもの*) and social interactions (*かいわ*)

We’ll start with a basic self-introduction (*じこしょうかい*) and then move into a dialogue for checking into a hotel (*ホテル* の *チェックイン*). I’ll provide vocabulary, grammar explanations, and additional example sentences to help you get comfortable with the language. Let’s begin!

## 自己紹介 (*じこしょうかい*) - Self Introduction

Let’s start by learning how to introduce yourself in Japanese. Below are example sentences tailored to you, エドワード, being from America with a family of 4.

### 例文 (*れいぶん*) - Examples:

- こんにちは、私の名前はエドワードです。  
*(Hello, my name is Edward.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| こんにちは | -          | hello                    |
| 私         | わたし     | I, me                    |
| の         | -          | possessive particle (of) |
| 名前       | なまえ     | name                     |
| は         | -          | topic marker             |
| エドワード | -          | Edward                   |
| です       | -          | is (copula)              |

- 私はアメリカから来ました。  
*(I am from America.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 私         | わたし     | I, me                    |
| は         | -          | topic marker             |
| アメリカ   | -          | America                  |
| から       | -          | from                     |
| 来ました   | きました   | came (past tense of "come") |

- 私の家族は4人です。  
*(My family has 4 people.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 私         | わたし     | I, me                    |
| の         | -          | possessive particle (of) |
| 家族       | かぞく     | family                   |
| は         | -          | topic marker             |
| 4          | よん       | four                     |
| 人         | にん       | person (counter for people) |
| です       | -          | is (copula)              |

- 私は日本語を勉強しています。  
*(I am studying Japanese.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 私         | わたし         | I, me                    |
| は         | -              | topic marker             |
| 日本語     | にほんご       | Japanese language        |
| を         | -              | object marker            |
| 勉強       | べんきょう     | study                    |
| しています | -              | is doing (progressive form) |

- 私は毎日日本の本を読みます。  
*(I read Japanese books every day.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 私         | わたし     | I, me                    |
| は         | -          | topic marker             |
| 毎日       | まいにち   | every day                |
| 日本       | にほん     | Japan                    |
| の         | -          | possessive particle (of) |
| 本         | ほん       | book                     |
| を         | -          | object marker            |
| 読みます   | よみます   | read (present tense)     |

- 家族と一緒旅行に行きます。  
*(I go traveling with my family.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 家族       | かぞく     | family                   |
| と         | -          | with                     |
| 一緒       | いっしょ   | together                 |
| に         | -          | particle (indicating companionship) |
| 旅行       | りょこう   | travel                   |
| に         | -          | particle (indicating purpose/destination) |
| 行きます   | いきます   | go (present tense)       |

- こんにちは、アメリカから来たエドワードです。  
*(Hello, I’m Edward from America.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| こんにちは | -          | hello                    |
| アメリカ   | -          | America                  |
| から       | -          | from                     |
| 来た       | きた       | came (past tense, informal) |
| エドワード | -          | Edward                   |
| です       | -          | is (copula)              |

- 私の名前はエドワードで、家族は4人います。  
*(My name is Edward, and my family has 4 people.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 私         | わたし     | I, me                    |
| の         | -          | possessive particle (of) |
| 名前       | なまえ     | name                     |
| は         | -          | topic marker             |
| エドワード | -          | Edward                   |
| で         | -          | and (conjunction)        |
| 家族       | かぞく     | family                   |
| は         | -          | topic marker             |
| 4          | よん       | four                     |
| 人         | にん       | person (counter for people) |
| います     | -          | exist (for animate objects) |

## ホテル (*ホテル*) のチェックイン (*チェックイン*) - Hotel Check-in

Next, let’s learn a conversation for checking into a hotel (*ホテル*). Below is a dialogue with additional examples.

### 対話 (*たいわ*) - Dialogue:

**ホテルスタッフ:**  
いらっしゃいませ。ご予約のお名前をお願いします。  
*(Welcome. May I have your reservation name, please?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| いらっしゃいませ | -          | welcome (polite greeting) |
| ご         | -              | honorific prefix         |
| 予約       | よやく         | reservation              |
| の         | -              | possessive particle (of) |
| 名前       | なまえ         | name                     |
| を         | -              | object marker            |
| お願いします | おねがいします | please (do)              |

**あなた:**  
はい、エドワードです。  
*(Yes, it’s Edward.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| はい       | -          | yes                      |
| エドワード | -          | Edward                   |
| です       | -          | is (copula)              |

**ホテルスタッフ:**  
ありがとうございます。エドワード様ですね。シングルルームを1泊ご予約いただいています。  
*(Thank you. Mr. Edward, you have a reservation for a single room for one night.)*

| Vocabulary       | Kana           | English Gloss            |
|------------------|----------------|--------------------------|
| ありがとうございます | -          | thank you (polite)       |
| エドワード       | -              | Edward                   |
| 様               | さま           | honorific suffix (Mr./Ms.) |
| ですね           | -              | isn’t it? (confirmation) |
| シングルルーム   | -              | single room              |
| を               | -              | object marker            |
| 1泊              | いっぱく       | one night                |
| ご               | -              | honorific prefix         |
| 予約             | よやく         | reservation              |
| いただいています | -              | have received (humble)   |

**あなた:**  
はい、そうです。  
*(Yes, that’s correct.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| はい       | -          | yes                      |
| そうです   | -          | that’s right             |

**ホテルスタッフ:**  
お部屋の鍵です。朝食は7時から9時までです。  
*(Here is your room key. Breakfast is from 7 to 9 a.m.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| お         | -              | honorific prefix         |
| 部屋       | へや           | room                     |
| の         | -              | possessive particle (of) |
| 鍵         | かぎ           | key                      |
| です       | -              | is (copula)              |
| 朝食       | ちょうしょく   | breakfast                |
| は         | -              | topic marker             |
| 7時        | しちじ         | 7 o’clock                |
| から       | -              | from                     |
| 9時        | くじ           | 9 o’clock                |
| まで       | -              | until                    |

**あなた:**  
ありがとうございます。Wi-Fiはありますか？  
*(Thank you. Is there Wi-Fi?)*

| Vocabulary       | Kana           | English Gloss            |
|------------------|----------------|--------------------------|
| ありがとうございます | -          | thank you (polite)       |
| Wi-Fi            | ワイファイ     | Wi-Fi                    |
| は               | -              | topic marker             |
| あります         | -              | exists (for inanimate objects) |
| か               | -              | question marker          |

**ホテルスタッフ:**  
はい、Wi-Fiは無料でご利用いただけます。パスワードは「hotel123」です。  
*(Yes, Wi-Fi is free. The password is "hotel123".)*

| Vocabulary       | Kana           | English Gloss            |
|------------------|----------------|--------------------------|
| はい             | -              | yes                      |
| Wi-Fi            | ワイファイ     | Wi-Fi                    |
| は               | -              | topic marker             |
| 無料             | むりょう       | free                     |
| で               | -              | by means of (particle)   |
| ご               | -              | honorific prefix         |
| 利用             | りよう         | use                      |
| いただけます     | -              | can use (humble)         |
| パスワード       | -              | password                 |
| は               | -              | topic marker             |
| です             | -              | is (copula)              |

**あなた:**  
わかりました。ありがとうございます。  
*(I understand. Thank you.)*

| Vocabulary       | Kana           | English Gloss            |
|------------------|----------------|--------------------------|
| わかりました     | -              | I understand             |
| ありがとうございます | -          | thank you (polite)       |

### 追加 (*ついか*) の例文 (*れいぶん*) - Additional Examples:

- ご予約は2泊です。  
*(The reservation is for 2 nights.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| ご         | -          | honorific prefix         |
| 予約       | よやく     | reservation              |
| は         | -          | topic marker             |
| 2          | に         | two                      |
| 泊         | はく       | night (counter for nights) |
| です       | -          | is (copula)              |

- お部屋は2階にあります。  
*(The room is on the 2nd floor.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| お         | -          | honorific prefix         |
| 部屋       | へや       | room                     |
| は         | -          | topic marker             |
| 2          | に         | two                      |
| 階         | かい       | floor (counter for floors) |
| に         | -          | particle (location)      |
| あります   | -          | exists (for inanimate objects) |

- 朝ご飯はありますか？  
*(Is there breakfast?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 朝ご飯     | あさごはん | breakfast                |
| は         | -          | topic marker             |
| あります   | -          | exists (for inanimate objects) |
| か         | -          | question marker          |

- 鍵をください。  
*(Please give me the key.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 鍵         | かぎ       | key                      |
| を         | -          | object marker            |
| ください   | -          | please (give me)         |

### 重要 (*じゅうよう*) な単語 (*たんご*) - Key Vocabulary

| Vocabulary | Kana       | English Gloss |
|------------|------------|---------------|
| 予約       | よやく     | reservation   |
| 名前       | なまえ     | name          |
| 部屋       | へや       | room          |
| 鍵         | かぎ       | key           |
| 朝食       | ちょうしょく | breakfast     |
| Wi-Fi      | ワイファイ | Wi-Fi         |
| 無料       | むりょう   | free          |
| 利用       | りよう     | use           |
| パスワード | -          | password      |

#### Note on “Breakfast” Words:
- **朝食 (*ちょうしょく*) vs. 朝ご飯 (*あさごはん*):**  
  - 朝食 (*ちょうしょく*) is formal/polite, often used in hotels or written contexts (e.g., "Breakfast is from 7 to 9").  
  - 朝ご飯 (*あさごはん*) is casual, common in daily speech (e.g., "Did you eat breakfast?"). For travel, 朝食 (*ちょうしょく*) is more likely in service settings, while 朝ご飯 (*あさごはん*) suits informal chats.

- **部屋 (*へや*) vs. ルーム (*ルーム*):**  
  - 部屋 (*へや*) is a native Japanese word for "room," used broadly (e.g., "my room").  
  - ルーム is a loanword from English, often used in modern contexts like hotels (e.g., "single room" as シングルルーム). In this lesson, 部屋 (*へや*) is polite and versatile, while ルーム is specific to hotel jargon.

### 文法 (*ぶんぽう*) のポイント - Grammar Points

1. **丁寧語 (*ていねいご*) - Polite Language:**  
Polite language, or *丁寧語* (*teineigo*), is essential in service settings like hotels or restaurants. It shows respect and is marked by polite verb forms (e.g., です, ます) and honorific prefixes like お or ご.

- お願いします。  
*(Please do it.)*

| Vocabulary   | Kana           | English Gloss |
|--------------|----------------|---------------|
| お願いします | おねがいします | please (do)   |

- どうぞ、お部屋へお上がりください。  
*(Please, go to your room.)*

| Vocabulary   | Kana           | English Gloss            |
|--------------|----------------|--------------------------|
| どうぞ       | -              | please (offering)        |
| お           | -              | honorific prefix         |
| 部屋         | へや           | room                     |
| へ           | -              | particle (direction)     |
| お上がりください | -          | please go up (humble)    |

- お荷物を預かります。  
*(I’ll take your luggage.)*

| Vocabulary   | Kana           | English Gloss            |
|--------------|----------------|--------------------------|
| お           | -              | honorific prefix         |
| 荷物         | にもつ         | luggage                  |
| を           | -              | object marker            |
| 預かります   | あずかります   | will take (humble)       |

2. **名詞 (*めいし*) + です - Noun + "Is":**  
This structure connects a subject (A) to a description (B) using は (topic marker) and です (copula), meaning "A is B." It’s a simple way to state facts or identities.

- 私はエドワードです。  
*(I am Edward.)*

| Vocabulary | Kana       | English Gloss |
|------------|------------|---------------|
| 私         | わたし     | I, me         |
| は         | -          | topic marker  |
| エドワード | -          | Edward        |
| です       | -          | is (copula)   |

- 日本はきれいです。  
*(Japan is beautiful.)*

| Vocabulary | Kana       | English Gloss |
|------------|------------|---------------|
| 日本       | にほん     | Japan         |
| は         | -          | topic marker  |
| きれい     | -          | beautiful     |
| です       | -          | is (copula)   |

- ホテルは新しいです。  
*(The hotel is new.)*

| Vocabulary | Kana       | English Gloss |
|------------|------------|---------------|
| ホテル     | -          | hotel         |
| は         | -          | topic marker  |
| 新しい     | あたらしい | new           |
| です       | -          | is (copula)   |

3. **質問 (*しつもん*) の仕方 (*しかた*) - Asking Questions:**  
To ask a yes/no question, add か (question marker) to the end of a statement. It turns a declaration into a query without changing the word order.

- Wi-Fiはありますか？  
*(Is there Wi-Fi?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| Wi-Fi      | ワイファイ | Wi-Fi                    |
| は         | -          | topic marker             |
| あります   | -          | exists (for inanimate objects) |
| か         | -          | question marker          |

- 駅は近いですか？  
*(Is the station close?)*

| Vocabulary | Kana       | English Gloss |
|------------|------------|---------------|
| 駅         | えき       | station       |
| は         | -          | topic marker  |
| 近い       | ちかい     | close         |
| です       | -          | is (copula)   |
| か         | -          | question marker |

- 水は冷たいですか？  
*(Is the water cold?)*

| Vocabulary | Kana       | English Gloss |
|------------|------------|---------------|
| 水         | みず       | water         |
| は         | -          | topic marker  |
| 冷たい     | つめたい   | cold          |
| です       | -          | is (copula)   |
| か         | -          | question marker |

## 語彙 (*ごい*) リスト - Vocabulary Glossary

Here’s a complete list of all vocabulary used in this lesson, including romanization.

| Vocabulary       | Kana           | English Gloss            | Romanization        |
|------------------|----------------|--------------------------|---------------------|
| こんにちは       | -              | hello                    | konnichiha          |
| 私               | わたし         | I, me                    | watashi             |
| の               | -              | possessive particle (of) | no                  |
| 名前             | なまえ         | name                     | namae               |
| は               | -              | topic marker             | ha                  |
| エドワード       | -              | Edward                   | edowādo             |
| です             | -              | is (copula)              | desu                |
| アメリカ         | -              | America                  | amerika             |
| から             | -              | from                     | kara                |
| 来ました         | きました       | came (past tense of "come") | kimashita        |
| 家族             | かぞく         | family                   | kazoku              |
| 4                | よん           | four                     | yon                 |
| 人               | にん           | person (counter for people) | nin              |
| 日本語           | にほんご       | Japanese language        | nihongo             |
| を               | -              | object marker            | o                   |
| 勉強             | べんきょう     | study                    | benkyō              |
| しています       | -              | is doing (progressive form) | shiteimasu       |
| 毎日             | まいにち       | every day                | mainichi            |
| 日本             | にほん         | Japan                    | nihon               |
| 本               | ほん           | book                     | hon                 |
| 読みます         | よみます       | read (present tense)     | yomimasu            |
| と               | -              | with                     | to                  |
| 一緒             | いっしょ       | together                 | issho               |
| に               | -              | particle (various uses)  | ni                  |
| 旅行             | りょこう       | travel                   | ryokō               |
| 行きます         | いきます       | go (present tense)       | ikimasu             |
| 来た             | きた           | came (past tense, informal) | kita             |
| で               | -              | and (conjunction)        | de                  |
| います           | -              | exist (for animate objects) | imasu            |
| いらっしゃいませ | -              | welcome (polite greeting) | irasshaimase       |
| ご               | -              | honorific prefix         | go                  |
| 予約             | よやく         | reservation              | yoyaku              |
| お願いします     | おねがいします | please (do)              | onegaishimasu       |
| はい             | -              | yes                      | hai                 |
| ありがとうございます | -          | thank you (polite)       | arigatō gozaimasu   |
| 様               | さま           | honorific suffix (Mr./Ms.) | sama             |
| ですね           | -              | isn’t it? (confirmation) | desu ne             |
| シングルルーム   | -              | single room              | shinguru rūmu       |
| 1泊              | いっぱく       | one night                | ippaku              |
| いただいています | -              | have received (humble)   | itadaiteimasu       |
| そうです         | -              | that’s right             | sō desu             |
| お               | -              | honorific prefix         | o                   |
| 部屋             | へや           | room                     | heya                |
| 鍵               | かぎ           | key                      | kagi                |
| 朝食             | ちょうしょく   | breakfast                | chōshoku            |
| 7時              | しちじ         | 7 o’clock                | shichiji            |
| 9時              | くじ           | 9 o’clock                | kuji                |
| まで             | -              | until                    | made                |
| Wi-Fi            | ワイファイ     | Wi-Fi                    | waifai              |
| あります         | -              | exists (for inanimate objects) | arimasu      |
| か               | -              | question marker          | ka                  |
| 無料             | むりょう       | free                     | muryō               |
| 利用             | りよう         | use                      | riyō                |
| いただけます     | -              | can use (humble)         | itadakemasu         |
| パスワード       | -              | password                 | pasuwādo            |
| わかりました     | -              | I understand             | wakarimashita       |
| 2                | に             | two                      | ni                  |
| 泊               | はく           | night (counter for nights) | haku             |
| 階               | かい           | floor (counter for floors) | kai             |
| 朝ご飯           | あさごはん     | breakfast                | asagohan            |
| ください         | -              | please (give me)         | kudasai             |
| どうぞ           | -              | please (offering)        | dōzo                |
| へ               | -              | particle (direction)     | e                   |
| お上がりください | -              | please go up (humble)    | oagari kudasai      |
| 荷物             | にもつ         | luggage                  | nimotsu             |
| 預かります       | あずかります   | will take (humble)       | azukarimasu         |
| きれい           | -              | beautiful                | kirei               |
| 新しい           | あたらしい     | new                      | atarashii           |
| 駅               | えき           | station                  | eki                 |
| 近い             | ちかい         | close                    | chikai              |
| 水               | みず           | water                    | mizu                |
| 冷たい           | つめたい       | cold                     | tsumetai            |

## 追加 (*ついか*) の語彙 (*ごい*) - Additional Vocabulary

Here are 30-50 related words to expand your vocabulary:

| Vocabulary | Kana         | English Gloss    | Romanization    |
|------------|--------------|------------------|-----------------|
| 空港       | くうこう     | airport          | kūkō            |
| 駅         | えき         | station          | eki             |
| 電車       | でんしゃ     | train            | densha          |
| 切符       | きっぷ       | ticket           | kippu           |
| 荷物       | にもつ       | luggage          | nimotsu         |
| スーツケース | -          | suitcase         | sūtsukēsu       |
| パスポート | -            | passport         | pasupōto        |
| チェックイン | -          | check-in         | chekkuin        |
| チェックアウト | -        | check-out        | chekkuauto      |
| フロント   | -            | front desk       | furonto         |
| エレベーター | -          | elevator         | erebētā         |
| 階段       | かいだん     | stairs           | kaidan          |
| 入り口     | いりぐち     | entrance         | iriguchi        |
| 出口       | でぐち       | exit             | deguchi         |
| トイレ     | -            | toilet           | toire           |
| 浴室       | よくしつ     | bathroom         | yokushitsu      |
| シャワー   | -            | shower           | shawā           |
| タオル     | -            | towel            | taoru           |
| ベッド     | -            | bed              | beddo           |
| 枕         | まくら       | pillow           | makura          |
| 布団       | ふとん       | futon (bedding)  | futon           |
| 窓         | まど         | window           | mado            |
| カーテン   | -            | curtain          | kāten           |
| テレビ     | -            | television       | terebi          |
| 電話       | でんわ       | telephone        | denwa           |
| 冷蔵庫     | れいぞうこ   | refrigerator     | reizōko         |
| エアコン   | -            | air conditioner  | eakon           |
| 暖房       | だんぼう     | heating          | danbō           |
| インターネット | -        | internet         | intānetto      |
| ランプ     | -            | lamp             | ranpu           |

That’s it for today’s lesson! Next time, we’ll focus on conversations at the airport (*くうこう*) or train station (*えき*). If you have any questions or need clarification, feel free to ask. Keep up the great work, and let’s work together to reach your N2 goal! がんばってください (*ganbatte kudasai*)!
</lesson>

<instructions>
Updates for lesson 1.

1. Update all gloss and vocabulary tables as follows:

- Each word should be marked for pitch accent, using Accent Mark Notation.
- For this notation, place a ꜜ after the syllable where the pitch drops.
- Don't use any arrow for Heiban
- If the Vocabulary column is only Kana and the Kana column is empty, mark the word in the Vocabulary column.
- Otherwise, mark the word in the Kana column

2. Add an additional section explaining Japanese pitch accent:

- Add it above the Self Introduction
- Explain the Accent Mark Notation used in this lesson.
- Explain the different pitch patterns.
- Explain the pitch of particles as relates to the pitch patterns.
- Provide a table with some examples. Do not include these words in the lesson Glossary.

3. The vocabulary word お上がりください is missing the Kana column.

Output the markdown code block for Lesson 1 directly.
</instructions>
