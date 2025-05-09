import axios from 'axios'
import * as cheerio from 'cheerio'

export async function scrapeFashionphile() {
  const { data } = await axios.get('https://www.fashionphile.com/shop/handbags')
  const $ = cheerio.load(data)
  const results: { title: string, price: string, url: string }[] = []

  $('.product-grid__item').each((_, el) => {
    const title = $(el).find('.product-grid__title').text().trim()
    const price = $(el).find('.product-grid__price').text().trim()
    const url = 'https://www.fashionphile.com' + $(el).find('a').attr('href')
    if (title && price && url) {
      results.push({ title, price, url })
    }
  })

  return results.slice(0, 15) // top 15 bags
}
