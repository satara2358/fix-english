const COHERE_APY_KEY = 'mwTxpv7vr3c0IiUK2xmnSlS2LFuq0fWqHhOe35So'
const COHERE_APY_GENERATE_URL = 'https://api.cohere.ai/generate'

/** 
 * curl --location --request POST 'https://api.cohere.ai/v1/generate' \
  --header 'Authorization: BEARER mwTxpv7vr3c0IiUK2xmnSlS2LFuq0fWqHhOe35So' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "model": "command-xlarge-nightly",
      "prompt": "Generate an intro paragraph of a blog post geared towards people who are looking to learn how to rock climb. The post should be enthusiastic and speak to people who are inactive and nervous.",
      "max_tokens": 300,
      "temperature": 0.9,
      "k": 0,
      "stop_sequences": [],
      "return_likelihoods": "NONE"
    }'
 * * */
export async function fixMyEnglish(input){
  const data = {
    //const response = await cohere.generate
    model: 'xlarge',
    prompt: `This is a spell checker generator.
--
Incorrect sample: "I are good"
Corret sample: "I am good"
--
Incorrect sample: "I have 22 years old"
Corret sample: "I am 22 years old"
--
Incorrect sample: "I don't can know "
Corret sample: "I don't know"
--
Incorrect sample: "${input}"
Corret sample:`,
    max_tokens: 40,
    temperature:0.3,
    k:0,
    p:1,
    frequency_penalty:0,
    presence_penalty:0,
    stop_sequences: ['--'],
    return_likelihoods:'NONE'
}

  const response = await fetch(COHERE_APY_GENERATE_URL, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${COHERE_APY_KEY}`,
      "Content-Type": 'application/json',
      "Cohere-Version": '2022-12-06'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

  console.log(response)
  const { text } = response.generations[0]

  return text
  .replace('--', '')
  .replaceAll('"', '')
  .trim()

}