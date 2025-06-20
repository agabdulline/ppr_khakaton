from scripts.gis2_parse import gis2_parse
from scripts.yandex_parse import yandex_parse
from scripts.google_parse import google_parse
from scripts.rustore_parse import rustore_parse
from scripts.yell_parse import yell_parse
from scripts.otzovik_parse import otzovik_parse
from scripts.compare_files import compare_files
from scripts.use_gpt import process_reviews
from scripts.calc_rating import calc_rating

companies = ['petrol', 'e1card', 'kardeks', 'likard', 'opti24', 'polniy-bak', 'rn-kart']


for company in companies:
    gis2_parse(company)
    print(f'2gis {company} done')
    yandex_parse(company)
    print(f'yandex {company} done')
    google_parse(company)
    print(f'playmarket {company} done')
    rustore_parse(company)
    print(f'rustore {company} done')
    otzovik_parse(company)
    print(f'otzovik {company} done')
    yell_parse(company)
    print(f'yell {company} done')
    compare_files(company)
    print(f'comparing {company} done')
process_reviews()
print('gpt processing done')
calc_rating()
print('adding rating done')


