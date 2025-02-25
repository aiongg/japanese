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
- **Colloquial:** The language used throughout each lesson must be colloquial. The words, phrases, and patterns used must accurately reflect common everyday usage among native Japanese speakers in Japan.

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

Generate lessons following these exact specifications, ensuring consistency with Edward’s preferences, family details, and learning goals. Find the previous lesson content or summaries below, and wait for instructions on which lesson number and topic to generate next, or which modifications to make for a previous lesson. Specific instructions will be written in the <instructions> tag at the end of this prompt.
</background>

<lesson number=1># Lesson 1: Basic Introductions and Hotel Check-in

こんにちは (*konnichiha*)! I’m your Japanese language instructor, and I’m excited to help you, エドワード (*edowādo*), learn practical Japanese for everyday situations. Your goal of reaching N2 level in 6-12 months is ambitious, but with dedication and the right approach, it’s achievable. Since you already speak multiple languages, including Mandarin and Taiwanese Hokkien, you’ll likely adapt well to Japanese pronunciation and grammar. Plus, your familiarity with some Kanji from Mandarin will give you a head start, even though pronunciations differ.

I’ll teach you using standard Japanese writing, including Kanji (*かんじ*), Hiragana (*ひらがな*), and Katakana (*カタカナ*), with Kana readings provided in parentheses or vocabulary tables for all Kanji except in example sentences themselves. We’ll focus on practical scenarios you might encounter on vacation, such as:

- At the airport or train station (*くうこう* or *えき*)
- Checking into a hotel (*ホテル*)
- At a restaurant (*レストラン*)
- Asking for directions (*みちあんない*) or help (*たすけ*)
- Giving basic information about yourself and your family (*かぞく*)
- Shopping (*かいもの*) and social interactions (*かいわ*)

We’ll start with a basic self-introduction (*じこしょうかい*) and then move into a dialogue for checking into a hotel (*ホテル* の *チェックイン*). I’ll provide vocabulary, grammar explanations, and additional example sentences to help you get comfortable with the language—including pitch accent, which we’ll explore below. Let’s begin!

## 日本語 (*にほんご*) のピッチアクセント - Japanese Pitch Accent

Japanese uses pitch accent to distinguish words, unlike English’s stress accent. Pitch accent involves high (H) and low (L) tones across syllables, and the pattern can change a word’s meaning (e.g., はし H-L “bridge” vs. はꜜし L-H-L “chopsticks”). In this lesson, we use Accent Mark Notation: a ꜜ marks the syllable after which the pitch drops from high to low. If there’s no ꜜ, the word follows the Heiban (flat) pattern, starting low and rising to high across all syllables without a drop.

### Pitch Patterns:
1. **Heiban (平板) - Flat:** Starts low, rises to high, and stays high (no ꜜ). E.g., さꜜくら (sakura, cherry blossom) is not Heiban, but ねこ (neko, cat) is.
2. **Atamadaka (頭高) - Head-High:** High on the first syllable, drops on the second (ꜜ after first syllable). E.g., かꜜさ (kasa, umbrella).
3. **Nakadaka (中高) - Middle-High:** High starts after the first syllable, drops later (ꜜ after a middle syllable). E.g., おかꜜし (okashi, snack).
4. **Odaka (尾高) - Tail-High:** High until the last syllable, drops after (ꜜ after the final syllable if followed by a particle). E.g., さかなꜜ (sakana, fish).

### Particles and Pitch:
Particles like は, を, and に don’t have their own pitch; they follow the preceding word’s pattern. In Heiban, the particle stays high. In Odaka, the drop occurs on the particle (e.g., さかなꜜが L-H-H-L). In Atamadaka or Nakadaka, the particle stays low after the drop.

### Examples:
| Word          | Pitch Pattern | English Gloss | Notes                     |
|--- -----------|---------------|---------------|---------------------------|
| ねこ            | Heiban        | cat           | L-H, no drop              |
| かꜜさ           | Atamadaka     | umbrella      | H-L                       |
| おかꜜし          | Nakadaka      | snack         | L-H-L                     |
| さかなꜜ          | Odaka         | fish          | L-H-H (drops on particle) |

Now, let’s move to your self-introduction!

## 自己紹介 (*じこしょうかい*) - Self Introduction

Let’s start by learning how to introduce yourself in Japanese. Below are example sentences tailored to you, エドワード, being from America with a family of 4.

### 例文 (*れいぶん*) - Examples:

- こんにちは、私の名前はエドワードです。  
*(Hello, my name is Edward.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| こんにちはꜜ | -          | hello                    |
| 私         | わたꜜし   | I, me                    |
| の         | -          | possessive particle (of) |
| 名前       | なꜜまえ   | name                     |
| は         | -          | topic marker             |
| エドワード | -          | Edward                   |
| です       | -          | is (copula)              |

- 私はアメリカから来ました。  
*(I am from America.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 私         | わたꜜし   | I, me                    |
| は         | -          | topic marker             |
| アメリカ   | -          | America                  |
| から       | -          | from                     |
| 来ました   | きꜜました | came (past tense of "come") |

- 私の家族は4人です。  
*(My family has 4 people.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 私         | わたꜜし   | I, me                    |
| の         | -          | possessive particle (of) |
| 家族       | かꜜぞく   | family                   |
| は         | -          | topic marker             |
| 4          | よん       | four                     |
| 人         | にん       | person (counter for people) |
| です       | -          | is (copula)              |

- 私は日本語を勉強しています。  
*(I am studying Japanese.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 私         | わたꜜし       | I, me                    |
| は         | -              | topic marker             |
| 日本語     | にほんꜜご     | Japanese language        |
| を         | -              | object marker            |
| 勉強       | べんꜜきょう   | study                    |
| しています | -              | is doing (progressive form) |

- 私は毎日日本の本を読みます。  
*(I read Japanese books every day.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 私         | わたꜜし   | I, me                    |
| は         | -          | topic marker             |
| 毎日       | まいꜜにち | every day                |
| 日本       | にꜜほん   | Japan                    |
| の         | -          | possessive particle (of) |
| 本         | ほん       | book                     |
| を         | -          | object marker            |
| 読みます   | よꜜみます | read (present tense)     |

- 家族と一緒旅行に行きます。  
*(I go traveling with my family.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 家族       | かꜜぞく   | family                   |
| と         | -          | with                     |
| 一緒       | いꜜっしょ | together                 |
| に         | -          | particle (indicating companionship) |
| 旅行       | りょꜜこう | travel                   |
| に         | -          | particle (indicating purpose/destination) |
| 行きます   | いꜜきます | go (present tense)       |

- こんにちは、アメリカから来たエドワードです。  
*(Hello, I’m Edward from America.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| こんにちはꜜ | -          | hello                    |
| アメリカ   | -          | America                  |
| から       | -          | from                     |
| 来た       | きたꜜ     | came (past tense, informal) |
| エドワード | -          | Edward                   |
| です       | -          | is (copula)              |

- 私の名前はエドワードで、家族は4人います。  
*(My name is Edward, and my family has 4 people.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 私         | わたꜜし   | I, me                    |
| の         | -          | possessive particle (of) |
| 名前       | なꜜまえ   | name                     |
| は         | -          | topic marker             |
| エドワード | -          | Edward                   |
| で         | -          | and (conjunction)        |
| 家族       | かꜜぞく   | family                   |
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
| 予約       | よやꜜく       | reservation              |
| の         | -              | possessive particle (of) |
| 名前       | なꜜまえ       | name                     |
| を         | -              | object marker            |
| お願いします | おねがいꜜします | please (do)              |

**あなた:**  
はい、エドワードです。  
*(Yes, it’s Edward.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| はいꜜ     | -          | yes                      |
| エドワード | -          | Edward                   |
| です       | -          | is (copula)              |

**ホテルスタッフ:**  
ありがとうございます。エドワード様ですね。シングルルームを1泊ご予約いただいています。  
*(Thank you. Mr. Edward, you have a reservation for a single room for one night.)*

| Vocabulary       | Kana           | English Gloss            |
|------------------|----------------|--------------------------|
| ありがとうございます | -          | thank you (polite)       |
| エドワード       | -              | Edward                   |
| 様               | さꜜま         | honorific suffix (Mr./Ms.) |
| ですね           | -              | isn’t it? (confirmation) |
| シングルルーム   | -              | single room              |
| を               | -              | object marker            |
| 1泊              | いꜜっぱく     | one night                |
| ご               | -              | honorific prefix         |
| 予約             | よやꜜく       | reservation              |
| いただいています | -              | have received (humble)   |

**あなた:**  
はい、そうです。  
*(Yes, that’s correct.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| はいꜜ     | -          | yes                      |
| そꜜうです | -          | that’s right             |

**ホテルスタッフ:**  
お部屋の鍵です。朝食は7時から9時までです。  
*(Here is your room key. Breakfast is from 7 to 9 a.m.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| お         | -              | honorific prefix         |
| 部屋       | へꜜや         | room                     |
| の         | -              | possessive particle (of) |
| 鍵         | かꜜぎ         | key                      |
| です       | -              | is (copula)              |
| 朝食       | ちょꜜうしょく | breakfast                |
| は         | -              | topic marker             |
| 7時        | しちꜜじ       | 7 o’clock                |
| から       | -              | from                     |
| 9時        | くꜜじ         | 9 o’clock                |
| まで       | -              | until                    |

**あなた:**  
ありがとうございます。Wi-Fiはありますか？  
*(Thank you. Is there Wi-Fi?)*

| Vocabulary       | Kana           | English Gloss            |
|------------------|----------------|--------------------------|
| ありがとうございます | -          | thank you (polite)       |
| Wi-Fi            | ワイファꜜイ   | Wi-Fi                    |
| は               | -              | topic marker             |
| あります         | -              | exists (for inanimate objects) |
| か               | -              | question marker          |

**ホテルスタッフ:**  
はい、Wi-Fiは無料でご利用いただけます。パスワードは「hotel123」です。  
*(Yes, Wi-Fi is free. The password is "hotel123".)*

| Vocabulary       | Kana           | English Gloss            |
|------------------|----------------|--------------------------|
| はいꜜ           | -              | yes                      |
| Wi-Fi            | ワイファꜜイ   | Wi-Fi                    |
| は               | -              | topic marker             |
| 無料             | むꜜりょう     | free                     |
| で               | -              | by means of (particle)   |
| ご               | -              | honorific prefix         |
| 利用             | りよꜜう       | use                      |
| いただけます     | -              | can use (humble)         |
| パスワード       | -              | password                 |
| は               | -              | topic marker             |
| です             | -              | is (copula)              |

**あなた:**  
わかりました。ありがとうございます。  
*(I understand. Thank you.)*

| Vocabulary       | Kana           | English Gloss            |
|------------------|----------------|--------------------------|
| わかりましたꜜ   | -              | I understand             |
| ありがとうございます | -          | thank you (polite)       |

### 追加 (*ついか*) の例文 (*れいぶん*) - Additional Examples:

- ご予約は2泊です。  
*(The reservation is for 2 nights.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| ご         | -          | honorific prefix         |
| 予約       | よやꜜく   | reservation              |
| は         | -          | topic marker             |
| 2          | に         | two                      |
| 泊         | はꜜく     | night (counter for nights) |
| です       | -          | is (copula)              |

- お部屋は2階にあります。  
*(The room is on the 2nd floor.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| お         | -          | honorific prefix         |
| 部屋       | へꜜや     | room                     |
| は         | -          | topic marker             |
| 2          | に         | two                      |
| 階         | かꜜい     | floor (counter for floors) |
| に         | -          | particle (location)      |
| あります   | -          | exists (for inanimate objects) |

- 朝ご飯はありますか？  
*(Is there breakfast?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 朝ご飯     | あさꜜごはん | breakfast                |
| は         | -          | topic marker             |
| あります   | -          | exists (for inanimate objects) |
| か         | -          | question marker          |

- 鍵をください。  
*(Please give me the key.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 鍵         | かꜜぎ     | key                      |
| を         | -          | object marker            |
| くださいꜜ | -          | please (give me)         |

### 重要 (*じゅうよう*) な単語 (*たんご*) - Key Vocabulary

| Vocabulary | Kana       | English Gloss |
|------------|------------|---------------|
| 予約       | よやꜜく   | reservation   |
| 名前       | なꜜまえ   | name          |
| 部屋       | へꜜや     | room          |
| 鍵         | かꜜぎ     | key           |
| 朝食       | ちょꜜうしょく | breakfast     |
| Wi-Fi      | ワイファꜜイ | Wi-Fi         |
| 無料       | むꜜりょう | free          |
| 利用       | りよꜜう   | use           |
| パスワード | -          | password      |

#### Note on “Breakfast” Words:
- **朝食 (*ちょꜜうしょく*) vs. 朝ご飯 (*あさꜜごはん*):**  
  - 朝食 (*ちょꜜうしょく*) is formal/polite, often used in hotels or written contexts (e.g., "Breakfast is from 7 to 9"). Pitch: L-H-L-L.  
  - 朝ご飯 (*あさꜜごはん*) is casual, common in daily speech (e.g., "Did you eat breakfast?"). Pitch: L-H-L-L. For travel, 朝食 (*ちょꜜうしょく*) is more likely in service settings, while 朝ご飯 (*あさꜜごはん*) suits informal chats.

- **部屋 (*へꜜや*) vs. ルーム (*ルーム*):**  
  - 部屋 (*へꜜや*) is a native Japanese word for "room," used broadly (e.g., "my room"). Pitch: H-L.  
  - ルーム is a loanword from English, often used in modern contexts like hotels (e.g., "single room" as シングルルーム). Pitch: H-H. In this lesson, 部屋 (*へꜜや*) is polite and versatile, while ルーム is specific to hotel jargon.

### 文法 (*ぶんぽう*) のポイント - Grammar Points

1. **丁寧語 (*ていねいご*) - Polite Language:**  
Polite language, or *丁寧語* (*teineigo*), is essential in service settings like hotels or restaurants. It shows respect and is marked by polite verb forms (e.g., です, ます) and honorific prefixes like お or ご.

- お願いします。  
*(Please do it.)*

| Vocabulary   | Kana           | English Gloss |
|--------------|----------------|---------------|
| お願いします | おねがいꜜします | please (do)   |

- どうぞ、お部屋へお上がりください。  
*(Please, go to your room.)*

| Vocabulary   | Kana           | English Gloss            |
|--------------|----------------|--------------------------|
| どうぞꜜ     | -              | please (offering)        |
| お           | -              | honorific prefix         |
| 部屋         | へꜜや         | room                     |
| へ           | -              | particle (direction)     |
| お上がりください | おあがꜜりください | please go up (humble)    |

- お荷物を預かります。  
*(I’ll take your luggage.)*

| Vocabulary   | Kana           | English Gloss            |
|--------------|----------------|--------------------------|
| お           | -              | honorific prefix         |
| 荷物         | にꜜもつ       | luggage                  |
| を           | -              | object marker            |
| 預かります   | あずかꜜります | will take (humble)       |

2. **名詞 (*めいし*) + です - Noun + "Is":**  
This structure connects a subject (A) to a description (B) using は (topic marker) and です (copula), meaning "A is B." It’s a simple way to state facts or identities.

- 私はエドワードです。  
*(I am Edward.)*

| Vocabulary | Kana       | English Gloss |
|------------|------------|---------------|
| 私         | わたꜜし   | I, me         |
| は         | -          | topic marker  |
| エドワード | -          | Edward        |
| です       | -          | is (copula)   |

- 日本はきれいです。  
*(Japan is beautiful.)*

| Vocabulary | Kana       | English Gloss |
|------------|------------|---------------|
| 日本       | にꜜほん   | Japan         |
| は         | -          | topic marker  |
| きれꜜい   | -          | beautiful     |
| です       | -          | is (copula)   |

- ホテルは新しいです。  
*(The hotel is new.)*

| Vocabulary | Kana       | English Gloss |
|------------|------------|---------------|
| ホテル     | -          | hotel         |
| は         | -          | topic marker  |
| 新しい     | あたꜜらしい | new           |
| です       | -          | is (copula)   |

3. **質問 (*しつもん*) の仕方 (*しかた*) - Asking Questions:**  
To ask a yes/no question, add か (question marker) to the end of a statement. It turns a declaration into a query without changing the word order.

- Wi-Fiはありますか？  
*(Is there Wi-Fi?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| Wi-Fi      | ワイファꜜイ | Wi-Fi                    |
| は         | -          | topic marker             |
| あります   | -          | exists (for inanimate objects) |
| か         | -          | question marker          |

- 駅は近いですか？  
*(Is the station close?)*

| Vocabulary | Kana       | English Gloss |
|------------|------------|---------------|
| 駅         | えꜜき     | station       |
| は         | -          | topic marker  |
| 近い       | ちかꜜい   | close         |
| です       | -          | is (copula)   |
| か         | -          | question marker |

- 水は冷たいですか？  
*(Is the water cold?)*

| Vocabulary | Kana       | English Gloss |
|------------|------------|---------------|
| 水         | みꜜず     | water         |
| は         | -          | topic marker  |
| 冷たい     | つめたꜜい | cold          |
| です       | -          | is (copula)   |
| か         | -          | question marker |

## 語彙 (*ごい*) リスト - Vocabulary Glossary

Here’s a complete list of all vocabulary used in this lesson, including romanization and pitch accent.

| Vocabulary       | Kana           | English Gloss            | Romanization        |
|------------------|----------------|--------------------------|---------------------|
| こんにちはꜜ     | -              | hello                    | konnichiha          |
| 私               | わたꜜし       | I, me                    | watashi             |
| の               | -              | possessive particle (of) | no                  |
| 名前             | なꜜまえ       | name                     | namae               |
| は               | -              | topic marker             | ha                  |
| エドワード       | -              | Edward                   | edowādo             |
| です             | -              | is (copula)              | desu                |
| アメリカ         | -              | America                  | amerika             |
| から             | -              | from                     | kara                |
| 来ました         | きꜜました     | came (past tense of "come") | kimashita        |
| 家族             | かꜜぞく       | family                   | kazoku              |
| 4                | よん           | four                     | yon                 |
| 人               | にん           | person (counter for people) | nin              |
| 日本語           | にほんꜜご     | Japanese language        | nihongo             |
| を               | -              | object marker            | o                   |
| 勉強             | べんꜜきょう   | study                    | benkyō              |
| しています       | -              | is doing (progressive form) | shiteimasu       |
| 毎日             | まいꜜにち     | every day                | mainichi            |
| 日本             | にꜜほん       | Japan                    | nihon               |
| 本               | ほん           | book                     | hon                 |
| 読みます         | よꜜみます     | read (present tense)     | yomimasu            |
| と               | -              | with                     | to                  |
| 一緒             | いꜜっしょ     | together                 | issho               |
| に               | -              | particle (various uses)  | ni                  |
| 旅行             | りょꜜこう     | travel                   | ryokō               |
| 行きます         | いꜜきます     | go (present tense)       | ikimasu             |
| 来た             | きたꜜ         | came (past tense, informal) | kita             |
| で               | -              | and (conjunction)        | de                  |
| います           | -              | exist (for animate objects) | imasu            |
| いらっしゃいませ | -              | welcome (polite greeting) | irasshaimase       |
| ご               | -              | honorific prefix         | go                  |
| 予約             | よやꜜく       | reservation              | yoyaku              |
| お願いします     | おねがいꜜします | please (do)              | onegaishimasu       |
| はいꜜ           | -              | yes                      | hai                 |
| ありがとうございます | -          | thank you (polite)       | arigatō gozaimasu   |
| 様               | さꜜま         | honorific suffix (Mr./Ms.) | sama             |
| ですね           | -              | isn’t it? (confirmation) | desu ne             |
| シングルルーム   | -              | single room              | shinguru rūmu       |
| 1泊              | いꜜっぱく     | one night                | ippaku              |
| いただいています | -              | have received (humble)   | itadaiteimasu       |
| そꜜうです       | -              | that’s right             | sō desu             |
| お               | -              | honorific prefix         | o                   |
| 部屋             | へꜜや         | room                     | heya                |
| 鍵               | かꜜぎ         | key                      | kagi                |
| 朝食             | ちょꜜうしょく | breakfast                | chōshoku            |
| 7時              | しちꜜじ       | 7 o’clock                | shichiji            |
| 9時              | くꜜじ         | 9 o’clock                | kuji                |
| までꜜ           | -              | until                    | made                |
| Wi-Fi            | ワイファꜜイ   | Wi-Fi                    | waifai              |
| あります         | -              | exists (for inanimate objects) | arimasu      |
| か               | -              | question marker          | ka                  |
| 無料             | むꜜりょう     | free                     | muryō               |
| 利用             | りよꜜう       | use                      | riyō                |
| いただけます     | -              | can use (humble)         | itadakemasu         |
| パスワード       | -              | password                 | pasuwādo            |
| わかりましたꜜ   | -              | I understand             | wakarimashita       |
| 2                | に             | two                      | ni                  |
| 泊               | はꜜく         | night (counter for nights) | haku             |
| 階               | かꜜい         | floor (counter for floors) | kai             |
| 朝ご飯           | あさꜜごはん   | breakfast                | asagohan            |
| くださいꜜ       | -              | please (give me)         | kudasai             |
| どうぞꜜ         | -              | please (offering)        | dōzo                |
| へ               | -              | particle (direction)     | e                   |
| お上がりください | おあがꜜりください | please go up (humble)    | oagari kudasai      |
| 荷物             | にꜜもつ       | luggage                  | nimotsu             |
| 預かります       | あずかꜜります | will take (humble)       | azukarimasu         |
| きれꜜい         | -              | beautiful                | kirei               |
| 新しい           | あたꜜらしい   | new                      | atarashii           |
| 駅               | えꜜき         | station                  | eki                 |
| 近い             | ちかꜜい       | close                    | chikai              |
| 水               | みꜜず         | water                    | mizu                |
| 冷たい           | つめたꜜい     | cold                     | tsumetai            |

## 追加 (*ついか*) の語彙 (*ごい*) - Additional Vocabulary

Here are 30-50 related words to expand your vocabulary:

| Vocabulary | Kana         | English Gloss    | Romanization    |
|------------|--------------|------------------|-----------------|
| 空港       | くうこꜜう   | airport          | kūkō            |
| 駅         | えꜜき       | station          | eki             |
| 電車       | でんꜜしゃ   | train            | densha          |
| 切符       | きꜜっぷ     | ticket           | kippu           |
| 荷物       | にꜜもつ     | luggage          | nimotsu         |
| スーツケース | -          | suitcase         | sūtsukēsu       |
| パスポート | -            | passport         | pasupōto        |
| チェックイン | -          | check-in         | chekkuin        |
| チェックアウト | -        | check-out        | chekkuauto      |
| フロント   | -            | front desk       | furonto         |
| エレベーター | -          | elevator         | erebētā         |
| 階段       | かいꜜだん   | stairs           | kaidan          |
| 入り口     | いりꜜぐち  | entrance         | iriguchi        |
| 出口       | でꜜぐち    | exit             | deguchi         |
| トイレ     | -            | toilet           | toire           |
| 浴室       | よꜜくしつ  | bathroom         | yokushitsu      |
| シャワー   | -            | shower           | shawā           |
| タオル     | -            | towel            | taoru           |
| ベッド     | -            | bed              | beddo           |
| 枕         | まꜜくら    | pillow           | makura          |
| 布団       | ふꜜとん    | futon (bedding)  | futon           |
| 窓         | まꜜど      | window           | mado            |
| カーテン   | -            | curtain          | kāten           |
| テレビ     | -            | television       | terebi          |
| 電話       | でんꜜわ    | telephone        | denwa           |
| 冷蔵庫     | れいぞꜜうこ | refrigerator     | reizōko         |
| エアコン   | -            | air conditioner  | eakon           |
| 暖房       | だんぼꜜう   | heating          | danbō           |
| インターネット | -        | internet         | intānetto      |
| ランプ     | -            | lamp             | ranpu           |

That’s it for today’s lesson! Next time, we’ll focus on conversations at the airport (*くうこう*) or train station (*えき*). If you have any questions or need clarification—especially about pitch accent—feel free to ask. Keep up the great work, and let’s work together to reach your N2 goal! がんばってください (*ganbatte kudasai*)!
</lesson>

<lesson number=2>
# Lesson 2: Navigating Train Stations and Airports

こんにちは, エドワード! Welcome to Lesson 2. Today, we’ll build on your skills by focusing on practical Japanese for train stations (*えき*) and airports (*くうこう*). These are key scenarios for your vacation, covering buying tickets, asking about platforms and facilities, validating passes, checking in, and handling immigration/customs. Let’s dive in with dialogues and examples to get you comfortable with the language.

## 駅 (*えき*) での会話 (*かいわ*) - Train Station Conversations

Let’s start with useful phrases at a train station (*えき*). Below is a dialogue followed by additional examples.

### 対話 (*たいわ*) - Dialogue:

**あなた:**  
こんにちは、東京までの切符をください。  
*(Hello, please give me a ticket to Tokyo.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| こんにちはꜜ | -          | hello                    |
| 東京       | とうきょꜜう | Tokyo                    |
| までꜜ     | -          | until/to                 |
| 切符       | きꜜっぷ    | ticket                   |
| を         | -          | object marker            |
| くださいꜜ | -          | please (give me)         |

**駅員 (*えきいん*) - Station Staff:**  
はい、片道ですか、往復ですか？  
*(Yes, one-way or round-trip?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| はいꜜ     | -          | yes                      |
| 片道      | かたꜜみち | one-way                  |
| です       | -          | is (copula)              |
| か         | -          | question marker          |
| 往復      | おうꜜふく | round-trip               |

**あなた:**  
片道でお願いします。いくらですか？  
*(One-way, please. How much is it?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 片道      | かたꜜみち     | one-way                  |
| で         | -              | by means of (particle)   |
| お願いします | おねがいꜜします | please (do)              |
| いくらꜜ   | -              | how much                 |
| です       | -              | is (copula)              |
| か         | -              | question marker          |

**駅員 (*えきいん*):**  
1500円です。袋にお入れしますか？  
*(It’s 1500 yen. Would you like it in a bag?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 1500       | せんごひゃく | 1500                     |
| 円         | えん       | yen                      |
| です       | -          | is (copula)              |
| 袋         | ふꜜくろ   | bag                      |
| に         | -          | particle (location)      |
| お入れします | おいれꜜします | put in (humble)          |
| か         | -          | question marker          |

**あなた:**  
いいえ、大丈夫です。ホームはどこですか？  
*(No, it’s fine. Where is the platform?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| いいえꜜ   | -              | no                       |
| 大丈夫     | だいじょうぶꜜ | fine/ok                  |
| です       | -              | is (copula)              |
| ホーム     | -              | platform                 |
| は         | -              | topic marker             |
| どこꜜ     | -              | where                    |
| です       | -              | is (copula)              |
| か         | -              | question marker          |

**駅員 (*えきいん*):**  
2番ホームです。あそこにあります。  
*(It’s platform 2. It’s over there.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 2          | に         | two                      |
| 番         | ばん       | number (counter)         |
| ホーム     | -          | platform                 |
| です       | -          | is (copula)              |
| あそこꜜ   | -          | over there               |
| に         | -          | particle (location)      |
| あります   | -          | exists (for inanimate objects) |

**あなた:**  
トイレはどこですか？  
*(Where is the bathroom?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| トイレ     | -          | bathroom                 |
| は         | -          | topic marker             |
| どこꜜ     | -          | where                    |
| です       | -          | is (copula)              |
| か         | -          | question marker          |

**駅員 (*えきいん*):**  
右にあります。  
*(It’s to the right.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 右         | みꜜぎ     | right                    |
| に         | -          | particle (location)      |
| あります   | -          | exists (for inanimate objects) |

### 追加 (*ついか*) の例文 (*れいぶん*) - Additional Examples:

- 大阪までの切符を2枚ください。  
*(Please give me two tickets to Osaka.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 大阪       | おおꜜさか | Osaka                    |
| までꜜ     | -          | until/to                 |
| 切符       | きꜜっぷ    | ticket                   |
| を         | -          | object marker            |
| 2          | に         | two                      |
| 枚         | まいꜜ     | counter for flat objects (e.g., tickets) |
| くださいꜜ | -          | please (give me)         |

- このパスは有効ですか？  
*(Is this pass valid?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| このꜜ     | -          | this                     |
| パス       | -          | pass                     |
| は         | -          | topic marker             |
| 有効       | ゆうこꜜう | valid                    |
| です       | -          | is (copula)              |
| か         | -          | question marker          |

- 京都行きの電車は何時ですか？  
*(What time is the train to Kyoto?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 京都       | きょうꜜと | Kyoto                    |
| 行きの     | いꜜきの   | bound for                |
| 電車       | でんꜜしゃ | train                    |
| は         | -          | topic marker             |
| 何時       | なんꜜじ   | what time                |
| です       | -          | is (copula)              |
| か         | -          | question marker          |

- 出口はあそこですか？  
*(Is the exit over there?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 出口       | でꜜぐち   | exit                     |
| は         | -          | topic marker             |
| あそこꜜ   | -          | over there               |
| です       | -          | is (copula)              |
| か         | -          | question marker          |

- 新幹線のホームは何番ですか？  
*(What platform is the Shinkansen?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 新幹線     | しんかんせんꜜ | Shinkansen (bullet train) |
| の         | -          | possessive particle (of) |
| ホーム     | -          | platform                 |
| は         | -          | topic marker             |
| 何         | なꜜん     | what                     |
| 番         | ばん       | number (counter)         |
| です       | -          | is (copula)              |
| か         | -          | question marker          |

- 荷物を預けたいです。どこですか？  
*(I want to store my luggage. Where is it?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 荷物       | にꜜもつ   | luggage                  |
| を         | -          | object marker            |
| 預けたい   | あずけたꜜい | want to store            |
| です       | -          | is (copula)              |
| どこꜜ     | -          | where                    |
| です       | -          | is (copula)              |
| か         | -          | question marker          |

- この切符は新幹線で使えますか？  
*(Can this ticket be used for the Shinkansen?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| このꜜ     | -          | this                     |
| 切符       | きꜜっぷ    | ticket                   |
| は         | -          | topic marker             |
| 新幹線     | しんかんせんꜜ | Shinkansen               |
| で         | -          | by means of (particle)   |
| 使えます   | つかえꜜます | can use                  |
| か         | -          | question marker          |

- 次の電車は何時に来ますか？  
*(When does the next train come?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 次         | つꜜぎ     | next                     |
| の         | -          | possessive particle (of) |
| 電車       | でんꜜしゃ | train                    |
| は         | -          | topic marker             |
| 何時       | なんꜜじ   | what time                |
| に         | -          | particle (time)          |
| 来ます     | きꜜます   | comes                    |
| か         | -          | question marker          |

## 空港 (*くうこう*) での会話 (*かいわ*) - Airport Conversations

Now, let’s move to airport (*くうこう*) scenarios, including check-in, in-flight, and immigration/customs.

### 対話 (*たいわ*) - Dialogue:

**あなた (Check-in):**  
こんにちは、成田行きの便をチェックインします。  
*(Hello, I’d like to check in for the Narita flight.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| こんにちはꜜ | -          | hello                    |
| 成田      | なꜜりた   | Narita                   |
| 行き      | いꜜき     | bound for                |
| の         | -          | possessive particle (of) |
| 便        | びん       | flight                   |
| を         | -          | object marker            |
| チェックイン | -          | check-in                 |
| します     | -          | do                       |

**係員 (*かかりいん*) - Staff:**  
パスポートをお預かりします。荷物はお預けになりますか？  
*(I’ll take your passport. Will you check your luggage?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| パスポート | -              | passport                 |
| を         | -              | object marker            |
| お預かりします | おあずかりꜜします | will take (humble)       |
| 荷物       | にꜜもつ       | luggage                  |
| は         | -              | topic marker             |
| お預け     | おあꜜずけ     | checking (luggage)       |
| に         | -              | particle (indicating result) |
| なります   | -              | becomes                  |
| か         | -              | question marker          |

**あなた:**  
はい、お願いします。搭乗口はどこですか？  
*(Yes, please. Where is the gate?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| はいꜜ     | -              | yes                      |
| お願いします | おねがいꜜします | please (do)              |
| 搭乗口     | とうじょうꜜぐち | gate                     |
| は         | -              | topic marker             |
| どこꜜ     | -              | where                    |
| です       | -              | is (copula)              |
| か         | -              | question marker          |

**係員 (*かかりいん*):**  
ゲート12です。搭乗券をどうぞ。  
*(Gate 12. Here’s your boarding pass.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| ゲート     | -              | gate                     |
| 12         | じゅうにꜜ     | twelve                   |
| です       | -              | is (copula)              |
| 搭乗券     | とうじょうꜜけん | boarding pass            |
| を         | -              | object marker            |
| どうぞꜜ   | -              | please (offering)        |

**あなた (In-flight):**  
水をもらえますか？  
*(Can I have some water?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 水         | みꜜず     | water                    |
| を         | -          | object marker            |
| もらえます | -          | can receive              |
| か         | -          | question marker          |

**客室乗務員 (*きゃくしつじょうむいん*) - Flight Attendant:**  
はい、お待ちください。  
*(Yes, please wait.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| はいꜜ     | -              | yes                      |
| お待ちください | おまちꜜください | please wait (humble)     |

**あなた (Immigration):**  
観光で来ました。  
*(I came for sightseeing.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 観光       | かんこꜜう | sightseeing              |
| で         | -          | for (particle)           |
| 来ました   | きꜜました | came                     |

**入国審査官 (*にゅうこくしんさかん*) - Immigration Officer:**  
何日滞在しますか？  
*(How many days will you stay?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 何日       | なんꜜにち | how many days            |
| 滞在       | たいざꜜい | stay                     |
| します     | -          | do                       |
| か         | -          | question marker          |

**あなた:**  
7日です。  
*(7 days.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 7          | しち      | seven                    |
| 日         | にち      | day (counter)            |
| です       | -          | is (copula)              |

### 追加 (*ついか*) の例文 (*れいぶん*) - Additional Examples:

- 窓側の席をお願いします。  
*(Please give me a window seat.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 窓側       | まどがꜜわ     | window side              |
| の         | -              | possessive particle (of) |
| 席         | せꜜき         | seat                     |
| を         | -              | object marker            |
| お願いします | おねがいꜜします | please (do)              |

- この便は遅れていますか？  
*(Is this flight delayed?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| このꜜ     | -          | this                     |
| 便         | びん       | flight                   |
| は         | -          | topic marker             |
| 遅れています | おくれていꜜます | is delayed               |
| か         | -          | question marker          |

- 税関はどこですか？  
*(Where is customs?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 税関       | ぜいかꜜん | customs                  |
| は         | -          | topic marker             |
| どこꜜ     | -          | where                    |
| です       | -          | is (copula)              |
| か         | -          | question marker          |

- 機内持ち込みできますか？  
*(Can I bring it on board?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 機内       | きなꜜい       | on board                 |
| 持ち込み   | もちこꜜみ     | bringing in              |
| できます   | -              | can do                   |
| か         | -              | question marker          |

- 毛布をください。  
*(Please give me a blanket.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 毛布       | もꜜうふ   | blanket                  |
| を         | -          | object marker            |
| くださいꜜ | -          | please (give me)         |

- 家族と一緒に旅行します。  
*(I’m traveling with my family.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 家族       | かꜜぞく   | family                   |
| と         | -          | with                     |
| 一緒       | いꜜっしょ | together                 |
| に         | -          | particle (indicating companionship) |
| 旅行       | りょꜜこう | travel                   |
| します     | -          | do                       |

- 日本に2週間滞在します。  
*(I’ll stay in Japan for 2 weeks.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 日本       | にꜜほん   | Japan                    |
| に         | -          | particle (location)      |
| 2          | に         | two                      |
| 週間       | しゅうかꜜん | week (counter)           |
| 滞在       | たいざꜜい | stay                     |
| します     | -          | do                       |

- 到着は何時ですか？  
*(What time is arrival?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 到着       | とうちゃꜜく | arrival                  |
| は         | -          | topic marker             |
| 何時       | なんꜜじ   | what time                |
| です       | -          | is (copula)              |
| か         | -          | question marker          |

### 文法 (*ぶんぽう*) のポイント (*ポイント*) - Grammar Points

1. **～まで - Indicating Destination or Extent:**  
The particle ～まで marks a destination or a limit, such as a place you’re going "to" or an extent of time/space. It’s often used with transportation or actions.

- 東京まで切符をください。  
*(Please give me a ticket to Tokyo.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 東京       | とうきょꜜう | Tokyo                    |
| までꜜ     | -          | until/to                 |
| 切符       | きꜜっぷ    | ticket                   |
| を         | -          | object marker            |
| くださいꜜ | -          | please (give me)         |

- 大阪まで行きます。  
*(I’ll go to Osaka.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 大阪       | おおꜜさか | Osaka                    |
| までꜜ     | -          | until/to                 |
| 行きます   | いꜜきます | go                       |

- 駅まで歩きます。  
*(I’ll walk to the station.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 駅         | えꜜき     | station                  |
| までꜜ     | -          | until/to                 |
| 歩きます   | あるきꜜます | walk                     |

2. **～たいです - Expressing Desire:**  
The ～たいです form expresses a personal desire to do something. It’s made by adding ～たい to a verb stem and ending with です for politeness, useful for stating what you want during travel.

- 荷物を預けたいです。  
*(I want to store my luggage.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 荷物       | にꜜもつ   | luggage                  |
| を         | -          | object marker            |
| 預けたい   | あずけたꜜい | want to store            |
| です       | -          | is (copula)              |

- 日本に行きたいです。  
*(I want to go to Japan.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 日本       | にꜜほん   | Japan                    |
| に         | -          | particle (destination)   |
| 行きたい   | いきたꜜい | want to go               |
| です       | -          | is (copula)              |

- 水を飲みたいです。  
*(I want to drink water.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 水         | みꜜず     | water                    |
| を         | -          | object marker            |
| 飲みたい   | のみたꜜい | want to drink            |
| です       | -          | is (copula)              |

3. **～できますか - Asking About Ability or Permission:**  
The ～できますか structure asks if something is possible or allowed. It’s formed by adding ～できる (can do) to a verb or noun and ending with か, perfect for checking options at stations or airports.

- 切符は新幹線で使えますか？  
*(Can this ticket be used for the Shinkansen?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 切符       | きꜜっぷ    | ticket                   |
| は         | -          | topic marker             |
| 新幹線     | しんかんせんꜜ | Shinkansen               |
| で         | -          | by means of (particle)   |
| 使えます   | つかえꜜます | can use                  |
| か         | -          | question marker          |

- ここで写真を撮れますか？  
*(Can I take a photo here?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| ここꜜ     | -          | here                     |
| で         | -          | at (particle)            |
| 写真       | しゃꜜしん | photo                    |
| を         | -          | object marker            |
| 撮れます   | とれꜜます | can take                 |
| か         | -          | question marker          |

- このパスを使えますか？  
*(Can I use this pass?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| このꜜ     | -          | this                     |
| パス       | -          | pass                     |
| を         | -          | object marker            |
| 使えます   | つかえꜜます | can use                  |
| か         | -          | question marker          |

## 語彙 (*ごい*) リスト - Vocabulary Glossary

| Vocabulary       | Kana           | English Gloss            | Romanization        |
|------------------|----------------|--------------------------|---------------------|
| こんにちはꜜ     | -              | hello                    | konnichiha          |
| 東京             | とうきょꜜう   | Tokyo                    | tōkyō               |
| までꜜ           | -              | until/to                 | made                |
| 切符             | きꜜっぷ        | ticket                   | kippu               |
| を               | -              | object marker            | o                   |
| くださいꜜ       | -              | please (give me)         | kudasai             |
| はいꜜ           | -              | yes                      | hai                 |
| 片道            | かたꜜみち     | one-way                  | katamichi           |
| です             | -              | is (copula)              | desu                |
| か               | -              | question marker          | ka                  |
| 往復            | おうꜜふく     | round-trip               | ōfuku               |
| で               | -              | by means of (particle)   | de                  |
| お願いします     | おねがいꜜします | please (do)              | onegaishimasu       |
| いくらꜜ         | -              | how much                 | ikura               |
| 1500             | せんごひゃく  | 1500                     | sengohyaku          |
| 円               | えん           | yen                      | en                  |
| 袋               | ふꜜくろ       | bag                      | fukuro              |
| に               | -              | particle (various uses)  | ni                  |
| お入れします     | おいれꜜします | put in (humble)          | oire shimasu        |
| いいえꜜ         | -              | no                       | iie                 |
| 大丈夫           | だいじょうぶꜜ | fine/ok                  | daijōbu             |
| ホーム           | -              | platform                 | hōmu                |
| は               | -              | topic marker             | ha                  |
| どこꜜ           | -              | where                    | doko                |
| 2                | に             | two                      | ni                  |
| 番               | ばん           | number (counter)         | ban                 |
| あそこꜜ         | -              | over there               | asoko               |
| あります         | -              | exists (for inanimate objects) | arimasu    |
| トイレ           | -              | bathroom                 | toire               |
| 右               | みꜜぎ         | right                    | migi                |
| 大阪             | おおꜜさか     | Osaka                    | ōsaka               |
| 枚               | まいꜜ         | counter for flat objects | mai                 |
| このꜜ           | -              | this                     | kono                |
| パス             | -              | pass                     | pasu                |
| 有効             | ゆうこꜜう     | valid                    | yūkō                |
| 京都             | きょうꜜと     | Kyoto                    | kyōto               |
| 行きの           | いꜜきの       | bound for                | iki no              |
| 電車             | でんꜜしゃ     | train                    | densha              |
| 何時             | なんꜜじ       | what time                | nanji               |
| 出口             | でꜜぐち       | exit                     | deguchi             |
| 新幹線           | しんかんせんꜜ | Shinkansen (bullet train) | shinkansen    |
| 何               | なꜜん         | what                     | nan                 |
| 荷物             | にꜜもつ       | luggage                  | nimotsu             |
| 預けたい         | あずけたꜜい   | want to store            | azuketai            |
| 使えます         | つかえꜜます   | can use                  | tsukaemasu          |
| 次               | つꜜぎ         | next                     | tsugi               |
| 来ます           | きꜜます       | comes                    | kimasu              |
| 成田            | なꜜりた       | Narita                   | narita              |
| 行き            | いꜜき         | bound for                | iki                 |
| 便              | びん           | flight                   | bin                 |
| チェックイン     | -              | check-in                 | chekkuin            |
| します           | -              | do                       | shimasu             |
| パスポート       | -              | passport                 | pasupōto            |
| お預かりします   | おあずかりꜜします | will take (humble)       | oazukari shimasu    |
| お預け           | おあꜜずけ     | checking (luggage)       | oazuke              |
| なります         | -              | becomes                  | narimasu            |
| 搭乗口           | とうじょうꜜぐち | gate                     | tōjōguchi           |
| ゲート           | -              | gate                     | gēto                |
| 12               | じゅうにꜜ     | twelve                   | jūni                |
| 搭乗券           | とうじょうꜜけん | boarding pass            | tōjōken             |
| どうぞꜜ         | -              | please (offering)        | dōzo                |
| 水               | みꜜず         | water                    | mizu                |
| もらえます       | -              | can receive              | moraemasu           |
| お待ちください   | おまちꜜください | please wait (humble)     | omachi kudasai      |
| 観光             | かんこꜜう     | sightseeing              | kankō               |
| 来ました         | きꜜました     | came                     | kimashita           |
| 何日             | なんꜜにち     | how many days            | nannichi            |
| 滞在             | たいざꜜい     | stay                     | taizai              |
| 7                | しち          | seven                    | shichi              |
| 日               | にち          | day (counter)            | nichi               |
| 窓側             | まどがꜜわ     | window side              | madogawa            |
| 席               | せꜜき         | seat                     | seki                |
| 遅れています     | おくれていꜜます | is delayed               | okureteimasu        |
| 税関             | ぜいかꜜん     | customs                  | zeikan              |
| 機内             | きなꜜい       | on board                 | kinai               |
| 持ち込み         | もちこꜜみ     | bringing in              | mochikomi           |
| できます         | -              | can do                   | dekimasu            |
| 毛布             | もꜜうふ       | blanket                  | mōfu                |
| 家族             | かꜜぞく       | family                   | kazoku              |
| 一緒             | いꜜっしょ     | together                 | issho               |
| 旅行             | りょꜜこう     | travel                   | ryokō               |
| 日本             | にꜜほん       | Japan                    | nihon               |
| 2                | に             | two                      | ni                  |
| 週間             | しゅうかꜜん   | week (counter)           | shūkan              |
| 到着             | とうちゃꜜく   | arrival                  | tōchaku             |
| 行きます         | いꜜきます     | go                       | ikimasu             |
| 歩きます         | あるきꜜます   | walk                     | arukimasu           |
| 行きたい         | いきたꜜい     | want to go               | ikitai              |
| 飲みたい         | のみたꜜい     | want to drink            | nomitai             |
| 写真             | しゃꜜしん     | photo                    | shashin             |
| 撮れます         | とれꜜます     | can take                 | toremasu            |

## 追加 (*ついか*) の語彙 (*ごい*) - Additional Vocabulary

| Vocabulary | Kana         | English Gloss        | Romanization    |
|------------|--------------|----------------------|-----------------|
| 駅員       | えきいꜜん   | station staff        | ekiin           |
| 改札口     | かいさつꜜぐち | ticket gate          | kaisatsuguchi   |
| 券売機     | けんばいꜜき | ticket machine       | kenbaiki        |
| 料金       | りょうきꜜん | fare                 | ryōkin          |
| 乗車券     | じょうしゃꜜけん | train ticket         | jōshaken        |
| 特急       | とっきゅꜜう | express train        | tokkyū          |
| 普通       | ふꜜつう    | local train          | futsū           |
| 時刻表     | じこくひょꜜう | timetable            | jikokuhyō       |
| 乗り換え   | のりかꜜえ   | transfer             | norikae         |
| 路線       | ろꜜせん    | route                | rosen           |
| 左         | ひだꜜり    | left                 | hidari          |
| 前         | まꜜえ      | front                | mae             |
| 後ろ       | うしꜜろ    | back                 | ushiro          |
| スーツケース | -          | suitcase             | sūtsukēsu       |
| 手荷物     | てにꜜもつ  | hand luggage         | tenimotsu       |
| ロッカー   | -            | locker               | rokkā           |
| 案内       | あꜜんない   | information/guide    | annai           |
| 空港       | くうこꜜう   | airport              | kūkō            |
| 出発       | しゅっぱꜜつ | departure            | shuppatsu       |
| 国際線     | こくさいせꜜん | international flight | kokusaisen      |
| 国内線     | こくナいせꜜん | domestic flight      | kokunaisen      |
| 保安検査   | ほあんけꜜんさ | security check       | hoanken’sa      |
| 免税店     | めんぜいてꜜん | duty-free shop       | menzeiten       |
| ゲート番号 | ゲートばんごꜜう | gate number          | gēto bangō      |
| 出国審査   | しゅっこくしꜜんさ | immigration (departure) | shukkoku shin’sa |
| 入国       | にゅうこꜜく | entry (to country)   | nyūkoku         |
| 荷物受取   | にもつうけとꜜり | baggage claim        | nimotsu uketori |
| 通路       | つうꜜろ    | aisle                | tsūro           |
| 通路側     | つうろがꜜわ | aisle side           | tsūrogawa       |
| 枕         | まꜜくら    | pillow               | makura          |
| イヤホン   | -            | earphones            | iyahon          |
| シート     | -            | seat (plane)         | shīto           |
| 非常口     | ひじょうꜜぐち | emergency exit       | hijōguchi       |
| 預ける     | あずけꜜる   | to check/store       | azukeru         |

That’s it for Lesson 2! Next time, we’ll explore restaurant and shopping scenarios to prepare you for dining with your family and picking up some Japanese fruits (*くだもの*). Great work so far, エドワード! がんばってください (*ganbatte kudasai*)!
</lesson>

<lesson number=3>
# Lesson 3: Dining at Restaurants

こんにちは (*konnichiha*), エドワード! Welcome to Lesson 3. Today, we’ll focus on practical Japanese for restaurant scenarios, tailored to your love for steak (*ステーキ*)—especially ribeye (*リブアイ*) and NY strip (*ニューヨークストリップ*), occasionally Wagyu (*和牛*)—grilling meats (*やきにく*), sashimi (*さしみ*), sushi (*すし*), and pork cutlet curries (*カツカレー*), and your wife’s favorites: ramen noodles (*ラーメン*), gyudon (*ぎゅうどん*), miso soup (*みそしる*), and other common Japanese dishes. You both enjoy Japanese fruits (*くだもの*), though they can be pricey. We’ll also include common dishes like steamed eggs (*茶碗蒸し*) and hot pot (*鍋*). We’ll cover family needs (two kids, one high chair), payment options (you asking about card or cash), spice preferences (very spicy for you, mild for your wife, none for kids), and your minor gluten allergy with one dedicated example. A new food vocabulary section will expand your options. Let’s get started!

## レストランでの会話 (*かいわ*) - Restaurant Conversations

Here’s a dialogue at a restaurant, followed by additional examples reflecting your family’s preferences and needs.

### 対話 (*たいわ*) - Dialogue:

**あなた:**  
こんにちは、4人です。子供が2人います。ハイチェアはありますか？  
*(Hello, we’re four people. We have two children. Is there a high chair?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| こんにちはꜜ | -          | hello                    |
| 4          | よん       | four                     |
| 人         | にん       | person (counter for people) |
| です       | -          | is (copula)              |
| 子供       | こꜜども   | child/children           |
| が         | -          | subject marker           |
| 2          | に         | two                      |
| います     | -          | exist (for animate objects) |
| ハイチェア | -          | high chair               |
| は         | -          | topic marker             |
| あります   | -          | exists (for inanimate objects) |
| か         | -          | question marker          |

**店員 (*てんいん*) - Waitstaff:**  
はい、ございます。こちらへどうぞ。メニューをどうぞ。  
*(Yes, we have one. This way please. Here’s the menu.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| はいꜜ     | -          | yes                      |
| ございます | -          | exists (polite)          |
| こちらꜜ   | -          | this way                 |
| へ         | -          | particle (direction)     |
| どうぞꜜ   | -          | please (offering)        |
| メニュー   | -          | menu                     |
| を         | -          | object marker            |

**あなた:**  
リブアイステーキを注文します。とても辛くしてください。  
*(I’ll order a ribeye steak. Please make it very spicy.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| リブアイ   | -              | ribeye                   |
| ステーキ   | -              | steak                    |
| を         | -              | object marker            |
| 注文       | ちゅうꜜもん   | order                    |
| します     | -              | do                       |
| とてもꜜ   | -              | very                     |
| 辛く       | からꜜく       | spicy (adverb form)      |
| してください | -          | please do                |

**店員 (*てんいん*):**  
かしこまりました。焼き加減はどうしますか？  
*(Understood. How would you like it cooked?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| かしこまりました | -          | understood (formal)      |
| 焼き加減       | やきかꜜげん   | cooking preference       |
| は             | -              | topic marker             |
| どうꜜ         | -              | how                      |
| します         | -              | do                       |
| か             | -              | question marker          |

**あなた:**  
ミディアムでお願いします。妻は牛丼、少し辛くしてください。子供には辛くないみそ汁をください。  
*(Medium, please. My wife will have gyudon, mildly spicy. Please give the kids non-spicy miso soup.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| ミディアム | -              | medium                   |
| で         | -              | by means of (particle)   |
| お願いします | おねがいꜜします | please (do)              |
| 妻         | つꜜま         | wife                     |
| は         | -              | topic marker             |
| 牛丼       | ぎゅうどꜜん   | gyudon (beef bowl)       |
| 少し       | すこꜜし       | a little                 |
| 辛く       | からꜜく       | spicy (adverb form)      |
| してください | -          | please do                |
| 子供       | こꜜども       | child/children           |
| に         | -              | particle (indirect object) |
| 辛くない   | からくなꜜい   | not spicy                |
| みそ汁     | みそしꜜる     | miso soup                |
| を         | -              | object marker            |
| くださいꜜ | -              | please (give me)         |

**あなた:**  
カードでお支払いできますか、それとも現金だけですか？  
*(Can I pay by card, or is it cash only?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| カード     | -              | card                     |
| で         | -              | by means of (particle)   |
| お支払い   | おしはらꜜい   | payment                  |
| できます   | -              | can do                   |
| か         | -              | question marker          |
| それともꜜ | -              | or                       |
| 現金       | げんきꜜん     | cash                     |
| だけꜜ     | -              | only                     |
| です       | -              | is (copula)              |

**店員 (*てんいん*) - Response 1:**  
はい、カードで大丈夫です。お預かりします。  
*(Yes, card is fine. I’ll take it.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| はいꜜ     | -              | yes                      |
| カード     | -              | card                     |
| で         | -              | by means of (particle)   |
| 大丈夫     | だいじょうぶꜜ | fine/ok                  |
| です       | -              | is (copula)              |
| お預かりします | おあずかりꜜします | will take (humble)       |

**店員 (*てんいん*) - Response 2:**  
申し訳ありません、現金だけです。  
*(I’m sorry, cash only.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 申し訳ありません | もうしわけあꜜりません | I’m sorry (formal)       |
| 現金           | げんきꜜん     | cash                     |
| だけꜜ         | -              | only                     |
| です           | -              | is (copula)              |

**あなた:**  
果物はありますか？  
*(Do you have fruit?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 果物       | くだꜜもの     | fruit                    |
| は         | -              | topic marker             |
| あります   | -              | exists (for inanimate objects) |
| か         | -              | question marker          |

**店員 (*てんいん*):**  
はい、メロンがあります。少々お待ちください。  
*(Yes, we have melon. Please wait a moment.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| はいꜜ     | -              | yes                      |
| メロン     | -              | melon                    |
| が         | -              | subject marker           |
| あります   | -              | exists (for inanimate objects) |
| 少々       | しょうしょꜜう | a little (time)          |
| お待ちください | おまちꜜください | please wait (humble)     |

### 追加 (*ついか*) の例文 (*れいぶん*) - Additional Examples:

- ニューヨークストリップを注文します。  
*(I’ll order an NY strip.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| ニューヨークストリップ | - | NY strip                 |
| を             | -              | object marker            |
| 注文           | ちゅうꜜもん   | order                    |
| します         | -              | do                       |

- 和牛ステーキをレアでお願いします。  
*(Please make the Wagyu steak rare.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 和牛           | わꜜぎゅう     | Wagyu                    |
| ステーキ       | -              | steak                    |
| を             | -              | object marker            |
| レア           | -              | rare                     |
| で             | -              | by means of (particle)   |
| お願いします   | おねがいꜜします | please (do)              |

- 焼き肉を注文したいです。辛くしてください。  
*(I’d like to order grilled meat. Please make it spicy.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 焼き肉         | やきにꜜく     | grilled meat             |
| を             | -              | object marker            |
| 注文           | ちゅうꜜもん   | order                    |
| したい         | -              | want to (do)             |
| です           | -              | is (copula)              |
| 辛く           | からꜜく       | spicy (adverb form)      |
| してください   | -              | please do                |

- カツカレーを注文します。  
*(I’ll order a pork cutlet curry.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| カツカレー     | -              | pork cutlet curry        |
| を             | -              | object marker            |
| 注文           | ちゅうꜜもん   | order                    |
| します         | -              | do                       |

- 妻はラーメンを少し辛くしてください。  
*(Please make my wife’s ramen mildly spicy.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 妻             | つꜜま         | wife                     |
| は             | -              | topic marker             |
| ラーメン       | -              | ramen                    |
| を             | -              | object marker            |
| 少し           | すこꜜし       | a little                 |
| 辛く           | からꜜく       | spicy (adverb form)      |
| してください   | -              | please do                |

- 子供に辛くない寿司をください。  
*(Please give the kids non-spicy sushi.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 子供       | こꜜども   | child/children           |
| に         | -          | particle (indirect object) |
| 辛くない   | からくなꜜい | not spicy                |
| 寿司       | すꜜし     | sushi                    |
| を         | -          | object marker            |
| くださいꜜ | -          | please (give me)         |

- 茶碗蒸しを注文したいです。子供用にしてください。  
*(I’d like to order steamed eggs. Please make it for kids.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 茶碗蒸し   | ちゃわんむꜜし | steamed eggs             |
| を         | -              | object marker            |
| 注文       | ちゅうꜜもん   | order                    |
| したい     | -              | want to (do)             |
| です       | -              | is (copula)              |
| 子供用     | こどもよꜜう   | for kids                 |
| に         | -              | particle (purpose)       |
| してください | -          | please do                |

- 鍋を4人前ください。辛くしないでください。  
*(Please give me four servings of hot pot. Don’t make it spicy.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 鍋         | なꜜべ         | hot pot                  |
| を         | -              | object marker            |
| 4          | よん           | four                     |
| 人前       | にんまꜜえ     | serving (for people)     |
| くださいꜜ | -              | please (give me)         |
| 辛く       | からꜜく       | spicy (adverb form)      |
| しないでください | -          | please don’t do          |

- この料理にグルテンは入っていませんか？  
*(Does this dish contain gluten?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| このꜜ     | -              | this                     |
| 料理       | りょうꜜり     | dish/food                |
| に         | -              | particle (location)      |
| グルテン   | -              | gluten                   |
| は         | -              | topic marker             |
| 入っていません | はいっていまꜜせん | is not included          |
| か         | -              | question marker          |

**店員 (*てんいん*) - Response 1:**  
いいえ、入っていません。  
*(No, it doesn’t.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| いいえꜜ   | -              | no                       |
| 入っていません | はいっていまꜜせん | is not included          |

**店員 (*てんいん*) - Response 2:**  
はい、入っています。  
*(Yes, it does.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| はいꜜ     | -              | yes                      |
| 入っています | はいっていꜜます | is included              |

### 食品 (*しょくひん*) ボキャブラリー - Food Vocabulary

Here’s a list of 40 common Japanese food items not already covered, useful for expanding your restaurant vocabulary. These won’t appear in the final glossary.

| Vocabulary       | Kana           | English Gloss            |
|------------------|----------------|--------------------------|
| 鶏肉             | にわとꜜり     | chicken (meat)           |
| 豚肉             | ぶたにꜜく     | pork                     |
| 鴨肉             | かもにꜜく     | duck                     |
| 羊肉             | ひつじにꜜく   | lamb                     |
| チーズ           | -              | cheese                   |
| ヨーグルト       | -              | yogurt                   |
| バター           | -              | butter                   |
| 牛乳             | ぎゅうにゅꜜう | milk                     |
| リンゴ           | -              | apple                    |
| バナナ           | -              | banana                   |
| イチゴ           | -              | strawberry               |
| 桃               | もꜜも         | peach                    |
| 梨               | なꜜし         | pear                     |
| キャベツ         | -              | cabbage                  |
| レタス           | -              | lettuce                  |
| 玉ねぎ           | たまねꜜぎ     | onion                    |
| にんじん         | -              | carrot                   |
| ジャガイモ       | -              | potato                   |
| トマト           | -              | tomato                   |
| キュウリ         | -              | cucumber                 |
| マグロ           | -              | tuna (sushi)             |
| サーモン         | -              | salmon (sushi)           |
| ハマチ           | -              | yellowtail (sushi)       |
| イカ             | -              | squid (sushi)            |
| タコ             | -              | octopus (sushi)          |
| エビ             | -              | shrimp (sushi)           |
| ウニ             | -              | sea urchin (sushi)       |
| カニ             | -              | crab (sushi)             |
| イクラ           | -              | salmon roe (sushi)       |
| 味噌汁           | みそしꜜる     | miso soup (alternate reading) |
| すまし汁         | すましじꜜる   | clear soup               |
| とん汁           | とんじꜜる     | pork miso soup           |
| おでん           | -              | oden (stewed dish)       |
| うどん           | -              | udon noodles             |
| そば             | -              | soba noodles             |
| 天ぷら           | てんぷꜜら     | tempura                  |
| 焼き魚           | やきざꜜかな   | grilled fish             |
| 唐揚げ           | からあꜜげ     | fried chicken            |
| おにぎり         | -              | rice ball                |
| 納豆             | なっとꜜう     | natto (fermented soybeans) |

### 文法 (*ぶんぽう*) のポイント - Grammar Points

1. **～をください - Requesting Items Politely:**  
The structure ～をください is used to politely request an item. It combines the object marker を with ください (please give me), ideal for ordering food or items in a restaurant.

- みそ汁をください。  
*(Please give me miso soup.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| みそ汁     | みそしꜜる | miso soup                |
| を         | -          | object marker            |
| くださいꜜ | -          | please (give me)         |

- お水をください。  
*(Please give me water.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| お水       | おみꜜず   | water (polite)           |
| を         | -          | object marker            |
| くださいꜜ | -          | please (give me)         |

- お箸をください。  
*(Please give me chopsticks.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| お箸       | おはꜜし   | chopsticks (polite)      |
| を         | -          | object marker            |
| くださいꜜ | -          | please (give me)         |

2. **～てください - Polite Action Request:**  
The ～てください form politely requests someone to perform an action. It’s made by adding ～て (te-form of a verb) and ください, useful for specifying how you want something prepared.

- 辛くしてください。  
*(Please make it spicy.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 辛く       | からꜜく       | spicy (adverb form)      |
| してください | -          | please do                |

- 早くしてください。  
*(Please hurry.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 早く       | はやꜜく       | quickly                  |
| してください | -          | please do                |

- 袋に入れてください。  
*(Please put it in a bag.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 袋         | ふꜜくろ       | bag                      |
| に         | -              | particle (location)      |
| 入れてください | いれてꜜください | please put in            |

3. **～入っていませんか - Asking About Ingredients:**  
The structure ～入っていませんか asks if something is included in a dish, using the negative form of 入る (to be included) plus か. It’s perfect for checking dietary restrictions like your gluten allergy.

- グルテンは入っていませんか？  
*(Does this contain gluten?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| グルテン   | -              | gluten                   |
| は         | -              | topic marker             |
| 入っていません | はいっていまꜜせん | is not included          |
| か         | -              | question marker          |

- 小麦は入っていませんか？  
*(Does it contain wheat?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 小麦       | こむꜜぎ       | wheat                    |
| は         | -              | topic marker             |
| 入っていません | はいっていまꜜせん | is not included          |
| か         | -              | question marker          |

- 唐辛子は入っていませんか？  
*(Does it contain chili peppers?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 唐辛子     | とうがらしꜜ   | chili peppers            |
| は         | -              | topic marker             |
| 入っていません | はいっていまꜜせん | is not included          |
| か         | -              | question marker          |

## 語彙 (*ごい*) リスト - Vocabulary Glossary

| Vocabulary       | Kana           | English Gloss            | Romanization        |
|------------------|----------------|--------------------------|---------------------|
| こんにちはꜜ     | -              | hello                    | konnichiha          |
| 4                | よん           | four                     | yon                 |
| 人               | にん           | person (counter for people) | nin              |
| です             | -              | is (copula)              | desu                |
| 子供             | こꜜども       | child/children           | kodomo              |
| が               | -              | subject marker           | ga                  |
| 2                | に             | two                      | ni                  |
| います           | -              | exist (for animate objects) | imasu            |
| ハイチェア       | -              | high chair               | haichea             |
| は               | -              | topic marker             | ha                  |
| あります         | -              | exists (for inanimate objects) | arimasu    |
| か               | -              | question marker          | ka                  |
| はいꜜ           | -              | yes                      | hai                 |
| ございます       | -              | exists (polite)          | gozaimasu           |
| こちらꜜ         | -              | this way                 | kochira             |
| へ               | -              | particle (direction)     | e                   |
| どうぞꜜ         | -              | please (offering)        | dōzo                |
| メニュー         | -              | menu                     | menyū               |
| を               | -              | object marker            | o                   |
| リブアイ         | -              | ribeye                   | ribuai              |
| ステーキ         | -              | steak                    | sutēki              |
| 注文             | ちゅうꜜもん   | order                    | chūmon              |
| します           | -              | do                       | shimasu             |
| とてもꜜ         | -              | very                     | totemo              |
| 辛く             | からꜜく       | spicy (adverb form)      | karaku              |
| してください     | -              | please do                | shite kudasai       |
| かしこまりました | -              | understood (formal)      | kashikomarimashita |
| 焼き加減         | やきかꜜげん   | cooking preference       | yakikagen           |
| どうꜜ           | -              | how                      | dō                  |
| ミディアム       | -              | medium                   | midiamu             |
| で               | -              | by means of (particle)   | de                  |
| お願いします     | おねがいꜜします | please (do)              | onegaishimasu       |
| 妻               | つꜜま         | wife                     | tsuma               |
| 牛丼             | ぎゅうどꜜん   | gyudon (beef bowl)       | gyūdon              |
| 少し             | すこꜜし       | a little                 | sukoshi             |
| 辛くない         | からくなꜜい   | not spicy                | karakunai           |
| みそ汁           | みそしꜜる     | miso soup                | misoshiru           |
| に               | -              | particle (various uses)  | ni                  |
| くださいꜜ       | -              | please (give me)         | kudasai             |
| カード           | -              | card                     | kādo                |
| お支払い         | おしはらꜜい   | payment                  | oshiharai           |
| できます         | -              | can do                   | dekimasu            |
| それともꜜ       | -              | or                       | soretomo            |
| 現金             | げんきꜜん     | cash                     | genkin              |
| だけꜜ           | -              | only                     | dake                |
| 大丈夫           | だいじょうぶꜜ | fine/ok                  | daijōbu             |
| お預かりします   | おあずかりꜜします | will take (humble)       | oazukari shimasu    |
| 申し訳ありません | もうしわけあꜜりません | I’m sorry (formal)       | mōshiwake arimasen |
| 果物             | くだꜜもの     | fruit                    | kudamono            |
| メロン           | -              | melon                    | meron               |
| 少々             | しょうしょꜜう | a little (time)          | shōshō              |
| お待ちください   | おまちꜜください | please wait (humble)     | omachi kudasai      |
| ニューヨークストリップ | - | NY strip                 | nyūyōku sutorippu |
| 和牛             | わꜜぎゅう     | Wagyu                    | wagyū               |
| レア             | -              | rare                     | rea                 |
| 焼き肉           | やきにꜜく     | grilled meat             | yakiniku            |
| したい           | -              | want to (do)             | shitai              |
| カツカレー       | -              | pork cutlet curry        | katsukarē           |
| ラーメン         | -              | ramen                    | rāmen               |
| 寿司             | すꜜし         | sushi                    | sushi               |
| 茶碗蒸し         | ちゃわんむꜜし | steamed eggs             | chawanmushi         |
| 子供用           | こどもよꜜう   | for kids                 | kodomo yō           |
| 鍋               | なꜜべ         | hot pot                  | nabe                |
| 人前             | にんまꜜえ     | serving (for people)     | ninmae              |
| しないでください | -              | please don’t do          | shinaide kudasai    |
| 料理             | りょうꜜり     | dish/food                | ryōri               |
| グルテン         | -              | gluten                   | guruten             |
| いいえꜜ         | -              | no                       | iie                 |
| 入っています     | はいっていꜜます | is included              | haitteimasu         |
| お水             | おみꜜず       | water (polite)           | omizu               |
| お箸             | おはꜜし       | chopsticks (polite)      | ohashi              |
| 早く             | はやꜜく       | quickly                  | hayaku              |
| 袋               | ふꜜくろ       | bag                      | fukuro              |
| 入れてください   | いれてꜜください | please put in            | irete kudasai       |
| 小麦             | こむꜜぎ       | wheat                    | komugi              |
| 唐辛子           | とうがらしꜜ   | chili peppers            | tōgarashi           |

## 追加 (*ついか*) の語彙 (*ごい*) - Additional Vocabulary

| Vocabulary | Kana           | English Gloss            | Romanization        |
|------------|----------------|--------------------------|---------------------|
| レストラン | -              | restaurant               | resutoran           |
| 店員       | てんいꜜん     | waitstaff                | ten’in              |
| 席         | せꜜき         | seat                     | seki                |
| 予約       | よやꜜく       | reservation              | yoyaku              |
| テーブル   | -              | table                    | tēburu              |
| 椅子       | いꜜす         | chair                    | isu                 |
| 注文する   | ちゅうꜜもんする | to order                 | chūmon suru         |
| お品書き   | おしながꜜき   | menu (Japanese style)    | oshinagaki          |
| 前菜       | ぜんさꜜい     | appetizer                | zensai              |
| 主菜       | しゅさꜜい     | main dish                | shusai              |
| デザート   | -              | dessert                  | dezāto              |
| 飲み物     | のみもꜜの     | drink                    | nomimono            |
| お茶       | おꜜちゃ       | tea (green tea)          | ocha                |
| コーヒー   | -              | coffee                   | kōhī                |
| ジュース   | -              | juice                    | jūsu                |
| ビール     | -              | beer                     | bīru                |
| ワイン     | -              | wine                     | wain                |
| 箸         | はꜜし         | chopsticks               | hashi               |
| スプーン   | -              | spoon                    | supūn               |
| フォーク   | -              | fork                     | fōku                |
| ナイフ     | -              | knife                    | naifu               |
| 皿         | さꜜら         | plate                    | sara                |
| 丼         | どんぶꜜり     | bowl (deep)              | donburi             |
| 茶碗       | ちゃわꜜん     | rice bowl                | chawan              |
| グラス     | -              | glass                    | gurasu              |
| コース     | -              | course (meal set)        | kōsu                |
| 定食       | ていしょꜜく   | set meal                 | teishoku            |
| おしぼり   | -              | wet towel                | oshibori            |
| 量         | りょꜜう       | portion/amount           | ryō                 |
| お代わり   | おかわꜜり     | refill                   | okawari             |
| お勘定     | おかんじょꜜう | bill/check               | okanjō              |
| レシート   | -              | receipt                  | reshīto             |
| 袋に入れる | ふくろにいꜜれる | to put in a bag          | fukuro ni ireru     |
| 持ち帰り   | もちかえꜜり   | takeout                  | mochikaeri          |
| 配達       | はいたꜜつ     | delivery                 | haitatsu            |

That’s it for Lesson 3! Next time, we’ll tackle shopping scenarios. Feel free to ask any questions or request clarification. がんばってください (*ganbatte kudasai*)!
</lesson>

<lesson number=4>
# Lesson 4: Shopping and Buying Things in Shops

こんにちは, エドワード! Welcome to Lesson 4. Today, we’ll focus on practical Japanese for shopping scenarios (*かいもの*), perfect for your vacation in Japan with your family of four. We’ll cover asking about prices, checking item availability (like lemon club soda, diapers, toothbrushes, and razors), finding shops or facilities (e.g., diaper-changing tables and bathrooms for your kids), and trying on clothes. I’ll weave in your family details—your wife and two children, one still in diapers (around 5kg)—and your preference for card payments when possible. Let’s get started with dialogues and examples to help you navigate Japanese shops confidently!

## 店 (*みせ*) での会話 (*かいわ*) - Shopping Conversations

Here’s a dialogue at a shop, followed by additional examples reflecting your shopping needs.

### 対話 (*たいわ*) - Dialogue:

**あなた:**  
こんにちは、このシャツはいくらですか？  
*(Hello, how much is this shirt?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| こんにちはꜜ | -          | hello                    |
| このꜜ     | -          | this                     |
| シャツ     | -          | shirt                    |
| は         | -          | topic marker             |
| いくらꜜ   | -          | how much                 |
| です       | -          | is (copula)              |
| か         | -          | question marker          |

**店員 (*てんいん*) - Shop Staff:**  
2500円です。袋にお入れしますか？  
*(It’s 2500 yen. Would you like it in a bag?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 2500       | にせんごひゃく | 2500                     |
| 円         | えん       | yen                      |
| です       | -          | is (copula)              |
| 袋         | ふꜜくろ   | bag                      |
| に         | -          | particle (location)      |
| お入れします | おいれꜜします | put in (humble)          |
| か         | -          | question marker          |

**あなた:**  
この商品をプレゼント用に包めますか？  
*(Can you wrap this item as a gift?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| このꜜ     | -              | this                     |
| 商品       | しょうひꜜん   | product/item             |
| を         | -              | object marker            |
| プレゼント | -              | present/gift             |
| 用         | よꜜう         | for (use)                |
| に         | -              | particle (purpose)       |
| 包めます   | つつめꜜます   | can wrap                 |
| か         | -              | question marker          |

**店員 (*てんいん*) - Response 1:**  
はい、できます。少々お待ちください。  
*(Yes, we can. Please wait a moment.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| はいꜜ     | -              | yes                      |
| できます   | -              | can do                   |
| 少々       | しょうしょꜜう | a little (time)          |
| お待ちください | おまちꜜください | please wait (humble)     |

**店員 (*てんいん*) - Response 2:**  
申し訳ありません、できません。  
*(I’m sorry, we can’t.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 申し訳ありません | もうしわけあꜜりません | I’m sorry (formal)       |
| できません | -              | cannot do                |

**あなた:**  
レモンクラブソーダはありますか？  
*(Do you have lemon club soda?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| レモン     | -              | lemon                    |
| クラブソーダ | -              | club soda                |
| は         | -              | topic marker             |
| あります   | -              | exists (for inanimate objects) |
| か         | -              | question marker          |

**店員 (*てんいん*):**  
はい、ございます。あそこにあります。  
*(Yes, we do. It’s over there.)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| はいꜜ     | -          | yes                      |
| ございます | -          | exists (polite)          |
| あそこꜜ   | -          | over there               |
| に         | -          | particle (location)      |
| あります   | -          | exists (for inanimate objects) |

**あなた:**  
この服を試着できますか？  
*(Can I try on these clothes?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| このꜜ     | -              | this                     |
| 服         | ふꜜく         | clothes                  |
| を         | -              | object marker            |
| 試着       | しちゃꜜく     | trying on (clothes)      |
| できます   | -              | can do                   |
| か         | -              | question marker          |

**店員 (*てんいん*):**  
はい、どうぞ。試着室はこちらです。  
*(Yes, please go ahead. The fitting room is this way.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| はいꜜ     | -              | yes                      |
| どうぞꜜ   | -              | please (offering)        |
| 試着室     | しちゃくしꜜつ | fitting room             |
| は         | -              | topic marker             |
| こちらꜜ   | -              | this way                 |
| です       | -              | is (copula)              |

**あなた:**  
息子がトイレを使いたいです。トイレはありますか？  
*(My son wants to use the bathroom. Is there a bathroom?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 息子       | むꜜすこ       | son                      |
| が         | -              | subject marker           |
| トイレ     | -              | bathroom                 |
| を         | -              | object marker            |
| 使いたい   | つかいたꜜい   | want to use              |
| です       | -              | is (copula)              |
| トイレ     | -              | bathroom                 |
| は         | -              | topic marker             |
| あります   | -              | exists (for inanimate objects) |
| か         | -              | question marker          |

**店員 (*てんいん*):**  
はい、奥にございます。どうぞ。  
*(Yes, it’s in the back. Please go ahead.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| はいꜜ     | -              | yes                      |
| 奥         | おꜜく         | back (of a place)        |
| に         | -              | particle (location)      |
| ございます | -              | exists (polite)          |
| どうぞꜜ   | -              | please (offering)        |

### 追加 (*ついか*) の例文 (*れいぶん*) - Additional Examples:

- おむつはありますか？  
*(Do you have diapers?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| おむつꜜ   | -          | diapers                  |
| は         | -          | topic marker             |
| あります   | -          | exists (for inanimate objects) |
| か         | -          | question marker          |

- 5キロの赤ちゃん用のおむつはありますか？  
*(Do you have diapers for a 5kg baby?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 5          | ご             | five                     |
| キロ       | -              | kilogram                 |
| の         | -              | possessive particle (of) |
| 赤ちゃん   | あかちゃꜜん   | baby                     |
| 用         | よꜜう         | for (use)                |
| の         | -              | possessive particle (of) |
| おむつꜜ   | -              | diapers                  |
| は         | -              | topic marker             |
| あります   | -              | exists (for inanimate objects) |
| か         | -              | question marker          |

- 歯ブラシと髭剃りはどこですか？  
*(Where are the toothbrushes and razors?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 歯ブラシ   | はぶらꜜし     | toothbrush               |
| と         | -              | and                      |
| 髭剃り     | ひげそꜜり     | razor (shaving)          |
| は         | -              | topic marker             |
| どこꜜ     | -              | where                    |
| です       | -              | is (copula)              |
| か         | -              | question marker          |

- 割引はありますか？  
*(Are there any discounts?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 割引       | わりびꜜき | discount                 |
| は         | -          | topic marker             |
| あります   | -          | exists (for inanimate objects) |
| か         | -          | question marker          |

- この服が似合うかどうか分かりますか？  
*(Can you tell if these clothes fit me?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| このꜜ     | -              | this                     |
| 服         | ふꜜく         | clothes                  |
| が         | -              | subject marker           |
| 似合う     | にあꜜう       | fit/suit                 |
| かどうか   | -              | whether or not           |
| 分かります | わかりꜜます   | understand/know          |
| か         | -              | question marker          |

**Response 1:**
- はい、似合います。
(*Yes, they fit.*)

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| はいꜜ     | -          | yes                      |
| 似合います | にあいまꜜす | fit/suit                 |

**Response 2:**
- 少し小さいです。
(*They’re a bit small.*)

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 少し       | すこꜜし   | a little                 |
| 小さい     | ちいさꜜい | small                    |
| です       | -          | is (copula)              |

- 近くにおむつを売っている店はありますか？  
*(Is there a shop nearby that sells diapers?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| 近く       | ちかꜜく       | nearby                   |
| に         | -              | particle (location)      |
| おむつꜜ   | -              | diapers                  |
| を         | -              | object marker            |
| 売っている | うっていꜜる   | is selling               |
| 店         | みꜜせ         | shop                     |
| は         | -              | topic marker             |
| あります   | -              | exists (for inanimate objects) |
| か         | -              | question marker          |

- おむつ替え台はありますか？  
*(Is there a diaper-changing table?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| おむつꜜ   | -              | diapers                  |
| 替え       | かꜜえ         | changing                 |
| 台         | だꜜい         | table/stand              |
| は         | -              | topic marker             |
| あります   | -              | exists (for inanimate objects) |
| か         | -              | question marker          |

- この靴の値段を教えてください。  
*(Please tell me the price of these shoes.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| このꜜ     | -              | this                     |
| 靴         | くꜜつ         | shoes                    |
| の         | -              | possessive particle (of) |
| 値段       | ねだꜜん       | price                    |
| を         | -              | object marker            |
| 教えてください | おしえてꜜください | please tell me           |

- このズボンを試着したいです。  
*(I want to try on these pants.)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| このꜜ     | -              | this                     |
| ズボン     | -              | pants                    |
| を         | -              | object marker            |
| 試着       | しちゃꜜく     | trying on (clothes)      |
| したい     | -              | want to (do)             |
| です       | -              | is (copula)              |

### 文法 (*ぶんぽう*) のポイント - Grammar Points

1. **～はいくらですか - Asking Prices:**  
The phrase ～はいくらですか politely asks the price of an item. Use は to mark the item as the topic and いくら (how much) with ですか for a question.

- このシャツはいくらですか？  
*(How much is this shirt?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| このꜜ     | -          | this                     |
| シャツ     | -          | shirt                    |
| は         | -          | topic marker             |
| いくらꜜ   | -          | how much                 |
| です       | -          | is (copula)              |
| か         | -          | question marker          |

- この靴はいくらですか？  
*(How much are these shoes?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| このꜜ     | -          | this                     |
| 靴         | くꜜつ     | shoes                    |
| は         | -          | topic marker             |
| いくらꜜ   | -          | how much                 |
| です       | -          | is (copula)              |
| か         | -          | question marker          |

- このお菓子はいくらですか？  
*(How much are these snacks?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| このꜜ     | -          | this                     |
| お菓子     | おかꜜし   | snacks                   |
| は         | -          | topic marker             |
| いくらꜜ   | -          | how much                 |
| です       | -          | is (copula)              |
| か         | -          | question marker          |

2. **～はありますか - Checking Availability:**  
The structure ～はありますか asks if something exists or is available. It uses は to mark the subject and あります (exists) with か for a question, great for shopping inquiries.

- レモンクラブソーダはありますか？  
*(Do you have lemon club soda?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| レモン     | -              | lemon                    |
| クラブソーダ | -              | club soda                |
| は         | -              | topic marker             |
| あります   | -              | exists (for inanimate objects) |
| か         | -              | question marker          |

- おむつはありますか？  
*(Do you have diapers?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| おむつꜜ   | -          | diapers                  |
| は         | -          | topic marker             |
| あります   | -          | exists (for inanimate objects) |
| か         | -          | question marker          |

- 歯ブラシはありますか？  
*(Do you have toothbrushes?)*

| Vocabulary | Kana       | English Gloss            |
|------------|------------|--------------------------|
| 歯ブラシ   | はぶらꜜし | toothbrush               |
| は         | -          | topic marker             |
| あります   | -          | exists (for inanimate objects) |
| か         | -          | question marker          |

3. **～を試着できますか - Asking to Try On:**  
The phrase ～を試着できますか asks if you can try on clothing. It uses を to mark the object (clothes), 試着 (trying on), and できますか (can do) for permission.

- この服を試着できますか？  
*(Can I try on these clothes?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| このꜜ     | -              | this                     |
| 服         | ふꜜく         | clothes                  |
| を         | -              | object marker            |
| 試着       | しちゃꜜく     | trying on (clothes)      |
| できます   | -              | can do                   |
| か         | -              | question marker          |

- このズボンを試着できますか？  
*(Can I try on these pants?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| このꜜ     | -              | this                     |
| ズボン     | -              | pants                    |
| を         | -              | object marker            |
| 試着       | しちゃꜜく     | trying on (clothes)      |
| できます   | -              | can do                   |
| か         | -              | question marker          |

- この帽子を試着できますか？  
*(Can I try on this hat?)*

| Vocabulary | Kana           | English Gloss            |
|------------|----------------|--------------------------|
| このꜜ     | -              | this                     |
| 帽子       | ぼうꜜし       | hat                      |
| を         | -              | object marker            |
| 試着       | しちゃꜜく     | trying on (clothes)      |
| できます   | -              | can do                   |
| か         | -              | question marker          |

## 語彙 (*ごい*) リスト - Vocabulary Glossary

| Vocabulary       | Kana           | English Gloss            | Romanization        |
|------------------|----------------|--------------------------|---------------------|
| こんにちはꜜ     | -              | hello                    | konnichiha          |
| このꜜ           | -              | this                     | kono                |
| シャツ           | -              | shirt                    | shatsu              |
| は               | -              | topic marker             | ha                  |
| いくらꜜ         | -              | how much                 | ikura               |
| です             | -              | is (copula)              | desu                |
| か               | -              | question marker          | ka                  |
| 2500             | にせんごひゃく | 2500                     | nisen gohyaku       |
| 円               | えん           | yen                      | en                  |
| 袋               | ふꜜくろ       | bag                      | fukuro              |
| に               | -              | particle (various uses)  | ni                  |
| お入れします     | おいれꜜします | put in (humble)          | oire shimasu        |
| 商品             | しょうひꜜん   | product/item             | shōhin              |
| プレゼント       | -              | present/gift             | purezento           |
| 用               | よꜜう         | for (use)                | yō                  |
| 包めます         | つつめꜜます   | can wrap                 | tsutsumemasu        |
| はいꜜ           | -              | yes                      | hai                 |
| できます         | -              | can do                   | dekimasu            |
| 少々             | しょうしょꜜう | a little (time)          | shōshō              |
| お待ちください   | おまちꜜください | please wait (humble)     | omachi kudasai      |
| 申し訳ありません | もうしわけあꜜりません | I’m sorry (formal)       | mōshiwake arimasen |
| できません       | -              | cannot do                | dekimasen           |
| レモン           | -              | lemon                    | remon               |
| クラブソーダ     | -              | club soda                | kurabu sōda         |
| あります         | -              | exists (for inanimate objects) | arimasu      |
| ございます       | -              | exists (polite)          | gozaimasu           |
| あそこꜜ         | -              | over there               | asoko               |
| 服               | ふꜜく         | clothes                  | fuku                |
| 試着             | しちゃꜜく     | trying on (clothes)      | shichaku            |
| どうぞꜜ         | -              | please (offering)        | dōzo                |
| 試着室           | しちゃくしꜜつ | fitting room             | shichaku shitsu     |
| こちらꜜ         | -              | this way                 | kochira             |
| 息子             | むꜜすこ       | son                      | musuko              |
| が               | -              | subject marker           | ga                  |
| トイレ           | -              | bathroom                 | toire               |
| を               | -              | object marker            | o                   |
| 使いたい         | つかいたꜜい   | want to use              | tsukaitai           |
| 奥               | おꜜく         | back (of a place)        | oku                 |
| おむつꜜ         | -              | diapers                  | omutsu              |
| 5                | ご             | five                     | go                  |
| キロ             | -              | kilogram                 | kiro                |
| の               | -              | possessive particle (of) | no                  |
| 赤ちゃん         | あかちゃꜜん   | baby                     | akachan             |
| 歯ブラシ         | はぶらꜜし     | toothbrush               | haburashi           |
| と               | -              | and                      | to                  |
| 髭剃り           | ひげそꜜり     | razor (shaving)          | higesori            |
| どこꜜ           | -              | where                    | doko                |
| 割引             | わりびꜜき     | discount                 | waribiki            |
| 似合う           | にあꜜう       | fit/suit                 | niau                |
| かどうか         | -              | whether or not           | ka dō ka            |
| 分かります       | わかりꜜます   | understand/know          | wakarimasu          |
| 似合います       | にあいまꜜす   | fit/suit                 | niaimasu            |
| 少し             | すこꜜし       | a little                 | sukoshi             |
| 小さい           | ちいさꜜい     | small                    | chiisai             |
| 近く             | ちかꜜく       | nearby                   | chikaku             |
| 売っている       | うっていꜜる   | is selling               | utteiru             |
| 店               | みꜜせ         | shop                     | mise                |
| おむつ替え       | おむつかꜜえ   | diaper changing          | omutsukae           |
| 台               | だꜜい         | table/stand              | dai                 |
| 靴               | くꜜつ         | shoes                    | kutsu               |
| 値段             | ねだꜜん       | price                    | nedan               |
| 教えてください   | おしえてꜜください | please tell me           | oshiete kudasai     |
| ズボン           | -              | pants                    | zubon               |
| したい           | -              | want to (do)             | shitai              |
| お菓子           | おかꜜし       | snacks                   | okashi              |
| 帽子             | ぼうꜜし       | hat                      | bōshi               |

## 追加 (*ついか*) の語彙 (*ごい*) - Additional Vocabulary

| Vocabulary       | Kana           | English Gloss            | Romanization        |
|------------------|----------------|--------------------------|---------------------|
| 買い物           | かいもꜜの     | shopping                 | kaimono             |
| 店員             | てんいꜜん     | shop staff               | ten’in              |
| 商品             | しょうひꜜん   | product/item             | shōhin              |
| 在庫             | ざいꜜこ       | stock/inventory          | zaiko               |
| サイズ           | -              | size                     | saizu               |
| 大きい           | おおきꜜい     | large                    | ōkii                |
| 中               | ちゅꜜう       | medium                   | chū                 |
| 小               | しょꜜう       | small                    | shō                 |
| 色               | いꜜろ         | color                    | iro                 |
| 赤               | あꜜか         | red                      | aka                 |
| 青               | あꜜお         | blue                     | ao                  |
| 白               | しꜜろ         | white                    | shiro               |
| 黒               | くꜜろ         | black                    | kuro                |
| 黄色             | きいꜜろ       | yellow                   | kiiro               |
| 試す             | ためꜜす       | to try                   | tamesu              |
| 着る             | きꜜる         | to wear                  | kiru                |
| 脱ぐ             | ぬꜜぐ         | to take off              | nugu                |
| 鏡               | かがꜜみ       | mirror                   | kagami              |
| 棚               | たꜜな         | shelf                    | tana                |
| 通路             | つうꜜろ       | aisle                    | tsūro               |
| レジ             | -              | cash register            | reji                |
| 会計             | かいけꜜい     | checkout                 | kaikei              |
| お釣り           | おつꜜり       | change (money)           | otsuri              |
| 税金             | ぜいきꜜん     | tax                      | zeikin              |
| セール           | -              | sale                     | sēru                |
| 安い             | やすꜜい       | cheap                    | yasui               |
| 高い             | たかꜜい       | expensive                | takai               |
| 値引き           | ねびꜜき       | price reduction          | nebiki              |
| ポイント         | -              | points (loyalty)         | pointo              |
| カート           | -              | cart                     | kāto                |
| バッグ           | -              | bag (shopping)           | baggu               |
| 包装             | ほうそꜜう     | wrapping                 | hōsō                |
| 返品             | へんピꜜん     | return (item)            | henpin              |
| 交換             | こうかꜜん     | exchange                 | kōkan               |

That’s it for Lesson 4! You’re now equipped to shop in Japan, whether for clothes, baby supplies, or snacks. Next time, we can explore another vacation scenario—perhaps asking for directions or handling emergencies. Feel free to ask any questions or request clarification. がんばってください (*ganbatte kudasai*)!
</lesson>

<instructions>
Now proceed with generating Lesson 5. This lesson should demonstrate some common dialogues that might be useful for getting around town, for example when taking a taxi, bus, or subway. I will provide some suggestions, but remember that you may provide alternatives if there is something more useful or appropriate.

Suggestions:

- Telling a taxi driver which restaurant to go to, including the name of the restaurant and the address. Use a real restaurant name and address in Tokyo.
- Asking a bus driver if this bus stops at my destination (for example, a tourist destination, use a real tourist destination bus stop name)
- Ask a bus station worker when the next bus comes. Use a real bus line number.
- Asking a subway station worker the best way to transfer from one line to another to arrive at the destination.

You may modify these suggestions, or add other dialogues that seem more useful or appropriate.

Additional requirements:

In addition to the grammar points section required by the main <background> prompt, add the following sections.

1. Add an additional section on Japanese addresses, explaining how they are written and said, how to find the building numbers, etc.
2. Add an additional section on telling time. Explain how to say the common times like o'clock, :15, :30, and :45.
3. Add an additional section on verb conjugations, using some of the verbs and conjugations used in this lesson as examples.
  - Explain the common regular verb forms, how to recognize them, and how to conjugate them into commonly used tenses.
  - Use words found in the lesson if possible.
  - Organize the information using tables if needed. 

In each of these sections, be sure to use Kana (not romanization) to write the pronunciation.
</instructions>
