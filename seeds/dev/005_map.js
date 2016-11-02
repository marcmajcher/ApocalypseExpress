'use strict';

/* eslint-env node */

const locations = [{
  name: 'Austin',
  latitude: '30.267153',
  longitude: '-97.7430608',
  population: 10000,
  type: 'freehold'
}, {
  name: 'Abeline',
  latitude: '32.4487364',
  longitude: '-99.7331439'
}, {
  name: 'Ackerly',
  latitude: '32.5264993',
  longitude: '-101.71597'
}, {
  name: 'Alice',
  latitude: '27.7522487',
  longitude: '-98.0697249'
}, {
  name: 'Allamoore',
  latitude: '31.078056',
  longitude: '-105.003056'
}, {
  name: 'Alpine',
  latitude: '30.3584919',
  longitude: '-103.6610115'
}, {
  name: 'Altuda',
  latitude: '30.301944',
  longitude: '-103.4575'
}, {
  name: 'Amarillo',
  latitude: '35.2219971',
  longitude: '-101.8312969'
}, {
  name: 'Andrews',
  latitude: '32.3187158',
  longitude: '-102.5457155'
}, {
  name: 'Angeles',
  latitude: '31.9015146',
  longitude: '-103.9624216'
}, {
  name: 'Aransas Pass',
  latitude: '27.9094677',
  longitude: '-97.1499898'
}, {
  name: 'Arlington',
  latitude: '32.735687',
  longitude: '-97.1080656'
}, {
  name: 'Asherton',
  latitude: '28.4435988',
  longitude: '-99.7589404'
}, {
  name: 'Aspermont',
  latitude: '33.1334307',
  longitude: '-100.2273276'
}, {
  name: 'Athens',
  latitude: '32.2048735',
  longitude: '-95.8555207'
}, {
  name: 'Atlanta',
  latitude: '33.1137419',
  longitude: '-94.1643537'
}, {
  name: 'Ballinger',
  latitude: '31.7382062',
  longitude: '-99.9473077'
}, {
  name: 'Balmorhea',
  latitude: '30.9843123',
  longitude: '-103.7446257'
}, {
  name: 'Bamhart',
  latitude: '31.1279389',
  longitude: '-101.170668'
}, {
  name: 'Bastrop',
  latitude: '30.1104947',
  longitude: '-97.3152701'
}, {
  name: 'Bay City',
  latitude: '28.9827565',
  longitude: '-95.969402'
}, {
  name: 'Baytown',
  latitude: '29.7355047',
  longitude: '-94.9774274'
}, {
  name: 'Beaumont',
  latitude: '30.080174',
  longitude: '-94.1265562'
}, {
  name: 'Beeville',
  latitude: '28.4008319',
  longitude: '-97.7483312'
}, {
  name: 'Belton',
  latitude: '31.0560132',
  longitude: '-97.464453'
}, {
  name: 'Big Lake',
  latitude: '31.1915437',
  longitude: '-101.4603945'
}, {
  name: 'Big Spring',
  latitude: '32.2503979',
  longitude: '-101.4787355'
}, {
  name: 'Boerne',
  latitude: '29.7946641',
  longitude: '-98.7319703'
}, {
  name: 'Booker',
  latitude: '36.4533648',
  longitude: '-100.5373673'
}, {
  name: 'Borger',
  latitude: '35.6678203',
  longitude: '-101.3973876'
}, {
  name: 'Bowie',
  latitude: '33.5589953',
  longitude: '-97.8486457'
}, {
  name: 'Bracketville',
  latitude: '29.3105125',
  longitude: '-100.4178563'
}, {
  name: 'Brady',
  latitude: '31.1351682',
  longitude: '-99.3350552'
}, {
  name: 'Breckenridge',
  latitude: '32.7556768',
  longitude: '-98.9022898'
}, {
  name: 'Brenham',
  latitude: '30.1668828',
  longitude: '-96.3977442'
}, {
  name: 'Brownfield',
  latitude: '33.1812035',
  longitude: '-102.2743489'
}, {
  name: 'Brownsville',
  latitude: '25.9017472',
  longitude: '-97.4974838'
}, {
  name: 'Brownwood',
  latitude: '31.7093197',
  longitude: '-98.9911611'
}, {
  name: 'Burkburnett',
  latitude: '34.0978711',
  longitude: '-98.5706134'
}, {
  name: 'Burnet',
  latitude: '30.7582376',
  longitude: '-98.2283585'
}, {
  name: 'Cactus',
  latitude: '36.0522574',
  longitude: '-102.0023992'
}, {
  name: 'Canadian',
  latitude: '35.91282',
  longitude: '-100.3820772'
}, {
  name: 'Canton',
  latitude: '32.5565244',
  longitude: '-95.8632996'
}, {
  name: 'Canyon',
  latitude: '34.9803342',
  longitude: '-101.9188024'
}, {
  name: 'Carlsbad',
  latitude: '32.4206736',
  longitude: '-104.2288375'
}, {
  name: 'Carrizo Springs',
  latitude: '28.5219292',
  longitude: '-99.8606107'
}, {
  name: 'Carta Valley',
  latitude: '29.79001',
  longitude: '-100.671501'
}, {
  name: 'Carthage',
  latitude: '32.1573841',
  longitude: '-94.3374199'
}, {
  name: 'Catarina',
  latitude: '28.3455475',
  longitude: '-99.6133788'
}, {
  name: 'Center',
  latitude: '31.7954512',
  longitude: '-94.1790862'
}, {
  name: 'Childress',
  latitude: '34.4264529',
  longitude: '-100.2040019'
}, {
  name: 'Chilicothe',
  latitude: '34.2564708',
  longitude: '-99.5167558'
}, {
  name: 'Cisco',
  latitude: '32.3881861',
  longitude: '-98.9792336'
}, {
  name: 'Clarendon',
  latitude: '34.9378289',
  longitude: '-100.8881993'
}, {
  name: 'Clarksville',
  latitude: '33.6106648',
  longitude: '-95.052722'
}, {
  name: 'Claude',
  latitude: '35.1117176',
  longitude: '-101.3632223'
}, {
  name: 'Coleman',
  latitude: '31.8273679',
  longitude: '-99.4264532'
}, {
  name: 'College Station',
  latitude: '30.627977',
  longitude: '-96.3344068'
}, {
  name: 'Colorado City',
  latitude: '32.3881745',
  longitude: '-100.8645576'
}, {
  name: 'Columbus',
  latitude: '29.7066232',
  longitude: '-96.5396933'
}, {
  name: 'Comanche',
  latitude: '31.8973693',
  longitude: '-98.6036581'
}, {
  name: 'Comfort',
  latitude: '29.967715',
  longitude: '-98.9050337'
}, {
  name: 'Commerce',
  latitude: '33.2470567',
  longitude: '-95.8999656'
}, {
  name: 'Concan',
  latitude: '29.5014937',
  longitude: '-99.7214883'
}, {
  name: 'Conroe',
  latitude: '30.3118769',
  longitude: '-95.4560512'
}, {
  name: 'Copperas Cove',
  latitude: '31.124062',
  longitude: '-97.9030785'
}, {
  name: 'Cornudas',
  latitude: '31.77944',
  longitude: '-105.465103'
}, {
  name: 'Corpus Christi',
  latitude: '27.8005828',
  longitude: '-97.396381'
}, {
  name: 'Corsicana',
  latitude: '32.0954304',
  longitude: '-96.4688727'
}, {
  name: 'Cotulla',
  latitude: '28.436934',
  longitude: '-99.2350322'
}, {
  name: 'Crane',
  latitude: '31.3973624',
  longitude: '-102.3501419'
}, {
  name: 'Crockett',
  latitude: '31.3182359',
  longitude: '-95.4566136'
}, {
  name: 'Crosbyton',
  latitude: '33.6600847',
  longitude: '-101.2379276'
}, {
  name: 'Crowell',
  latitude: '33.983973',
  longitude: '-99.7248158'
}, {
  name: 'Crystal City',
  latitude: '28.6774795',
  longitude: '-99.8281104'
}, {
  name: 'Cuero',
  latitude: '29.0938652',
  longitude: '-97.2891568'
}, {
  name: 'Dalhart',
  latitude: '36.0594772',
  longitude: '-102.5132497'
}, {
  name: 'Dallas',
  latitude: '32.7766642',
  longitude: '-96.7969879'
}, {
  name: 'Decatur',
  latitude: '33.2342834',
  longitude: '-97.5861393'
}, {
  name: 'Del Rio',
  latitude: '29.3708857',
  longitude: '-100.8958674'
}, {
  name: 'Denison',
  latitude: '33.7556593',
  longitude: '-96.536658'
}, {
  name: 'Denver City',
  latitude: '32.9645475',
  longitude: '-102.8290963'
}, {
  name: 'Diboll',
  latitude: '31.1871319',
  longitude: '-94.7810412'
}, {
  name: 'Dilley',
  latitude: '28.6674802',
  longitude: '-99.1705887'
}, {
  name: 'Dimmitt',
  latitude: '34.5509028',
  longitude: '-102.3118607'
}, {
  name: 'Dryden',
  latitude: '30.0446889',
  longitude: '-102.1143845'
}, {
  name: 'Dumas',
  latitude: '35.8653789',
  longitude: '-101.9732236'
}, {
  name: 'Eastland',
  latitude: '32.4015198',
  longitude: '-98.8175623'
}, {
  name: 'Edinburg',
  latitude: '26.3017374',
  longitude: '-98.1633432'
}, {
  name: 'Eden',
  latitude: '31.216276',
  longitude: '-99.8456277'
}, {
  name: 'Edna',
  latitude: '28.9785947',
  longitude: '-96.6460877'
}, {
  name: 'El Campo',
  latitude: '29.1966405',
  longitude: '-96.2696867'
}, {
  name: 'El Paso',
  latitude: '31.7618778',
  longitude: '-106.4850217'
}, {
  name: 'Eldorado',
  latitude: '30.8601745',
  longitude: '-100.6009299'
}, {
  name: 'Enical',
  latitude: '28.041117',
  longitude: '-99.3544787'
}, {
  name: 'Fairfield',
  latitude: '31.7246128',
  longitude: '-96.1652481'
}, {
  name: 'Falfurrias',
  latitude: '27.2269872',
  longitude: '-98.1441714'
}, {
  name: 'Floresville',
  latitude: '29.1335781',
  longitude: '-98.1561192'
}, {
  name: 'Floydada',
  latitude: '33.9845232',
  longitude: '-101.3376574'
}, {
  name: 'Fort Davis',
  latitude: '30.5882111',
  longitude: '-103.8946253'
}, {
  name: 'Fort Hancock',
  latitude: '31.2914585',
  longitude: '-105.860307'
}, {
  name: 'Fort Stockton',
  latitude: '30.8940431',
  longitude: '-102.8793222'
}, {
  name: 'Fort Worth',
  latitude: '32.7554883',
  longitude: '-97.3307658'
}, {
  name: 'Fredricksburg',
  latitude: '30.2752011',
  longitude: '-98.8719843'
}, {
  name: 'Freer',
  latitude: '27.8827965',
  longitude: '-98.6177929'
}, {
  name: 'Friona',
  latitude: '34.641734',
  longitude: '-102.7241047'
}, {
  name: 'Fritch',
  latitude: '35.6397655',
  longitude: '-101.603228'
}, {
  name: 'Gail',
  latitude: '32.7703457',
  longitude: '-101.445743'
}, {
  name: 'Gainesville',
  latitude: '33.6259414',
  longitude: '-97.1333453'
}, {
  name: 'Gatesville',
  latitude: '31.4351645',
  longitude: '-97.743911'
}, {
  name: 'Galveston',
  latitude: '29.3013479',
  longitude: '-94.7976958'
}, {
  name: 'Garden City',
  latitude: '31.8639016',
  longitude: '-101.4811969'
}, {
  name: 'George West',
  latitude: '28.3325002',
  longitude: '-98.1175054'
}, {
  name: 'Georgetown',
  latitude: '30.6332618',
  longitude: '-97.6779842'
}, {
  name: 'Giddings',
  latitude: '30.1827159',
  longitude: '-96.936371'
}, {
  name: 'Gilmer',
  latitude: '32.7287472',
  longitude: '-94.9424379'
}, {
  name: 'Goliad',
  latitude: '28.6683252',
  longitude: '-97.3883265'
}, {
  name: 'Gonzales',
  latitude: '29.5016257',
  longitude: '-97.4524926'
}, {
  name: 'Goodnight',
  latitude: '35.042488',
  longitude: '-101.192001'
}, {
  name: 'Graham',
  latitude: '33.1070597',
  longitude: '-98.589502'
}, {
  name: 'Granbury',
  latitude: '32.4420826',
  longitude: '-97.7941967'
}, {
  name: 'Grandfalls',
  latitude: '31.3393072',
  longitude: '-102.8518202'
}, {
  name: 'Grape Creek',
  latitude: '31.5898783',
  longitude: '-100.5431534'
}, {
  name: 'Groom',
  latitude: '35.2036602',
  longitude: '-101.1068215'
}, {
  name: 'Guthrie',
  latitude: '33.6206613',
  longitude: '-100.3228034'
}, {
  name: 'Harker Heights',
  latitude: '31.0835102',
  longitude: '-97.6597376'
}, {
  name: 'Harlingen',
  latitude: '26.1906306',
  longitude: '-97.6961026'
}, {
  name: 'Haskell',
  latitude: '33.1576031',
  longitude: '-99.7337014'
}, {
  name: 'Hearne',
  latitude: '30.8785238',
  longitude: '-96.5930258'
}, {
  name: 'Hebbronville',
  latitude: '27.3067057',
  longitude: '-98.6783516'
}, {
  name: 'Henderson',
  latitude: '32.1532156',
  longitude: '-94.7993802'
}, {
  name: 'Hereford',
  latitude: '34.8150622',
  longitude: '-102.3977036'
}, {
  name: 'Hermleigh',
  latitude: '32.6351114',
  longitude: '-100.7592804'
}, {
  name: 'Hilsboro',
  latitude: '32.0109886',
  longitude: '-97.1300061'
}, {
  name: 'Hobbes',
  latitude: '32.7026116',
  longitude: '-103.1360403'
}, {
  name: 'Houston',
  latitude: '29.7604267',
  longitude: '-95.3698028'
}, {
  name: 'Huntsville',
  latitude: '30.7235263',
  longitude: '-95.5507771'
}, {
  name: 'Iowa Park',
  latitude: '33.9514847',
  longitude: '-98.6686709'
}, {
  name: 'Iraan',
  latitude: '30.9140478',
  longitude: '-101.8979061'
}, {
  name: 'Jacksonville',
  latitude: '31.963778',
  longitude: '-95.2705042'
}, {
  name: 'Jasper',
  latitude: '30.9201995',
  longitude: '-93.9965759'
}, {
  name: 'Jefferson',
  latitude: '32.7573626',
  longitude: '-94.3451926'
}, {
  name: 'Junction',
  latitude: '30.4893555',
  longitude: '-99.7720109'
}, {
  name: 'Juno',
  latitude: '30.148689',
  longitude: '-101.116997'
}, {
  name: 'Kames City',
  latitude: '28.8849772',
  longitude: '-97.9008355'
}, {
  name: 'Katy',
  latitude: '29.7857853',
  longitude: '-95.8243956'
}, {
  name: 'Kenedy',
  latitude: '28.8191468',
  longitude: '-97.8486123'
}, {
  name: 'Kermit',
  latitude: '31.8576265',
  longitude: '-103.0926652'
}, {
  name: 'Kerrville',
  latitude: '30.0474332',
  longitude: '-99.1403189'
}, {
  name: 'Kilgore',
  latitude: '32.3862619',
  longitude: '-94.8757709'
}, {
  name: 'Killeen',
  latitude: '31.1171194',
  longitude: '-97.7277959'
}, {
  name: 'Kingsville',
  latitude: '27.5158689',
  longitude: '-97.856109'
}, {
  name: 'Knox City',
  latitude: '33.4181509',
  longitude: '-99.8189804'
}, {
  name: 'La Grange',
  latitude: '29.9055033',
  longitude: '-96.876647'
}, {
  name: 'Lake Jackson',
  latitude: '29.0338575',
  longitude: '-95.4343859'
}, {
  name: 'Lakeview',
  latitude: '31.6293316',
  longitude: '-97.1027792'
}, {
  name: 'Lamesa',
  latitude: '32.7376001',
  longitude: '-101.950992'
}, {
  name: 'Lampasas',
  latitude: '31.063784',
  longitude: '-98.1816957'
}, {
  name: 'Langtry',
  latitude: '29.8085582',
  longitude: '-101.5596817'
}, {
  name: 'Laredo',
  latitude: '27.5305671',
  longitude: '-99.4803241'
}, {
  name: 'Laughlin AFB',
  latitude: '29.3565576',
  longitude: '-100.7830826'
}, {
  name: 'Leakey',
  latitude: '29.7288351',
  longitude: '-99.761448'
}, {
  name: 'Levelland',
  latitude: '33.5873164',
  longitude: '-102.37796'
}, {
  name: 'Lindale',
  latitude: '32.5156971',
  longitude: '-95.4093998'
}, {
  name: 'Littlefield',
  latitude: '33.9173148',
  longitude: '-102.3249022'
}, {
  name: 'Livingston',
  latitude: '30.711029',
  longitude: '-94.9329898'
}, {
  name: 'Llano',
  latitude: '30.7593452',
  longitude: '-98.6750379'
}, {
  name: 'Longview',
  latitude: '32.5007037',
  longitude: '-94.7404891'
}, {
  name: 'Loving',
  latitude: '32.2862317',
  longitude: '-104.095773'
}, {
  name: 'Lubbock',
  latitude: '33.5778631',
  longitude: '-101.8551665'
}, {
  name: 'Lufkin',
  latitude: '31.3382406',
  longitude: '-94.729097'
}, {
  name: 'Madisonville',
  latitude: '30.9499111',
  longitude: '-95.9116188'
}, {
  name: 'Marathon',
  latitude: '30.2051688',
  longitude: '-103.2446205'
}, {
  name: 'Marble Falls',
  latitude: '30.5782446',
  longitude: '-98.2728003'
}, {
  name: 'Marfa',
  latitude: '30.3094622',
  longitude: '-104.020623'
}, {
  name: 'Marshall',
  latitude: '32.5448714',
  longitude: '-94.3674184'
}, {
  name: 'Mason',
  latitude: '30.7487884',
  longitude: '-99.230611'
}, {
  name: 'Matador',
  latitude: '34.0120211',
  longitude: '-100.8220785'
}, {
  name: 'Mathis',
  latitude: '28.0944558',
  longitude: '-97.8280543'
}, {
  name: 'McAllen',
  latitude: '26.2034071',
  longitude: '-98.2300124'
}, {
  name: 'McCarney',
  latitude: '31.1322516',
  longitude: '-102.2222058'
}, {
  name: 'McLean',
  latitude: '35.2325495',
  longitude: '-100.5998558'
}, {
  name: 'Melvin',
  latitude: '31.1951678',
  longitude: '-99.5797854'
}, {
  name: 'Memphis',
  latitude: '34.7247758',
  longitude: '-100.5340144'
}, {
  name: 'Menard',
  latitude: '30.9176736',
  longitude: '-99.7864587'
}, {
  name: 'Mentone',
  latitude: '31.7051291',
  longitude: '-103.5993477'
}, {
  name: 'Mertzon',
  latitude: '31.2618316',
  longitude: '-100.8173263'
}, {
  name: 'Midland',
  latitude: '31.9973456',
  longitude: '-102.0779146'
}, {
  name: 'Mineola',
  latitude: '32.6631884',
  longitude: '-95.4882896'
}, {
  name: 'Monahans',
  latitude: '31.5942991',
  longitude: '-102.8926536'
}, {
  name: 'Morton',
  latitude: '33.7250974',
  longitude: '-102.7593763'
}, {
  name: 'Mt Pleasant',
  latitude: '33.1567863',
  longitude: '-94.968269'
}, {
  name: 'Mt Vernon',
  latitude: '33.1887271',
  longitude: '-95.2213321'
}, {
  name: 'Muleshoe',
  latitude: '34.2264676',
  longitude: '-102.7238263'
}, {
  name: 'Munday',
  latitude: '33.4492628',
  longitude: '-99.6228637'
}, {
  name: 'Nacogdoches',
  latitude: '31.6035129',
  longitude: '-94.6554874'
}, {
  name: 'Navasota',
  latitude: '30.3879845',
  longitude: '-96.0877349'
}, {
  name: 'Nederland',
  latitude: '29.9743803',
  longitude: '-93.9923965'
}, {
  name: 'New Boston',
  latitude: '33.4598415',
  longitude: '-94.4154787'
}, {
  name: 'New Braunfels',
  latitude: '29.7030024',
  longitude: '-98.1244531'
}, {
  name: 'Odessa',
  latitude: '31.8456816',
  longitude: '-102.3676431'
}, {
  name: 'Orange',
  latitude: '30.0929879',
  longitude: '-93.7365549'
}, {
  name: 'Orla',
  latitude: '31.8234585',
  longitude: '-103.9089837'
}, {
  name: 'Ozona',
  latitude: '30.7022249',
  longitude: '-101.2013819'
}, {
  name: 'Paducah',
  latitude: '34.0123005',
  longitude: '-100.3020588'
}, {
  name: 'Palestine',
  latitude: '31.7621153',
  longitude: '-95.6307891'
}, {
  name: 'Pampa',
  latitude: '35.5361559',
  longitude: '-100.9598709'
}, {
  name: 'Pandale',
  latitude: '30.18067',
  longitude: '-101.5492019'
}, {
  name: 'Panhandle',
  latitude: '35.3456038',
  longitude: '-101.3804447'
}, {
  name: 'Paris',
  latitude: '33.6609389',
  longitude: '-95.555513'
}, {
  name: 'Pasadena',
  latitude: '29.6910625',
  longitude: '-95.2091006'
}, {
  name: 'Pearland',
  latitude: '29.5635666',
  longitude: '-95.2860474'
}, {
  name: 'Pearsall',
  latitude: '28.8921939',
  longitude: '-99.095033'
}, {
  name: 'Pecos',
  latitude: '31.4229124',
  longitude: '-103.4932293'
}, {
  name: 'Perico',
  latitude: '36.270031',
  longitude: '-102.867104'
}, {
  name: 'Perryton',
  latitude: '36.4000313',
  longitude: '-100.8026505'
}, {
  name: 'Pflugerville',
  latitude: '30.4393696',
  longitude: '-97.6200043'
}, {
  name: 'Pine Springs',
  latitude: '31.89378',
  longitude: '-104.797997'
}, {
  name: 'Pittsburg',
  latitude: '32.9954021',
  longitude: '-94.9657688'
}, {
  name: 'Plains',
  latitude: '33.1887135',
  longitude: '-102.8279888'
}, {
  name: 'Plainview',
  latitude: '34.1847936',
  longitude: '-101.7068417'
}, {
  name: 'Plano',
  latitude: '33.0198431',
  longitude: '-96.6988856'
}, {
  name: 'Pleasanton',
  latitude: '28.967194',
  longitude: '-98.4786269'
}, {
  name: 'Port Aransas',
  latitude: '27.8339158',
  longitude: '-97.0610994'
}, {
  name: 'Port Arthur',
  latitude: '29.8849504',
  longitude: '-93.939947'
}, {
  name: 'Port Lavaca',
  latitude: '28.6149968',
  longitude: '-96.6260892'
}, {
  name: 'Port O\'Connor',
  latitude: '28.4475898',
  longitude: '-96.4053596'
}, {
  name: 'Portland',
  latitude: '27.8772463',
  longitude: '-97.3238805'
}, {
  name: 'Post',
  latitude: '33.1909283',
  longitude: '-101.3781941'
}, {
  name: 'Quanah',
  latitude: '34.297855',
  longitude: '-99.7403718'
}, {
  name: 'Quebec',
  latitude: '30.5107032',
  longitude: '-104.399643'
}, {
  name: 'Ranger',
  latitude: '32.4698522',
  longitude: '-98.6789477'
}, {
  name: 'Rankin',
  latitude: '31.2226477',
  longitude: '-101.9379085'
}, {
  name: 'Rio Bravo',
  latitude: '27.3641887',
  longitude: '-99.4800415'
}, {
  name: 'Riviera',
  latitude: '27.2986493',
  longitude: '-97.8148885'
}, {
  name: 'Rockport',
  latitude: '28.0205733',
  longitude: '-97.0544341'
}, {
  name: 'RockSprings',
  latitude: '30.0157647',
  longitude: '-100.2053582'
}, {
  name: 'Rosenburg',
  latitude: '29.5571825',
  longitude: '-95.8085623'
}, {
  name: 'Rosenfeld',
  latitude: '30.103333',
  longitude: '-102.751667'
}, {
  name: 'Round Rock',
  latitude: '30.5082551',
  longitude: '-97.678896'
}, {
  name: 'Rusk',
  latitude: '31.7960064',
  longitude: '-95.1502214'
}, {
  name: 'Ryan',
  latitude: '30.43',
  longitude: '-104.298333'
}, {
  name: 'San Angelo',
  latitude: '31.4637723',
  longitude: '-100.4370375'
}, {
  name: 'San Antonio',
  latitude: '29.4241219',
  longitude: '-98.4936282'
}, {
  name: 'San Augustine',
  latitude: '31.5299029',
  longitude: '-94.1060282'
}, {
  name: 'San Diego',
  latitude: '27.7639145',
  longitude: '-98.2388953'
}, {
  name: 'San Marcos',
  latitude: '29.8832749',
  longitude: '-97.9413941'
}, {
  name: 'San Saba',
  latitude: '31.1957234',
  longitude: '-98.718098'
}, {
  name: 'Sanderson',
  latitude: '30.1424083',
  longitude: '-102.3940324'
}, {
  name: 'Santa Anna',
  latitude: '31.7420932',
  longitude: '-99.3217254'
}, {
  name: 'Saragosa',
  latitude: '31.0245647',
  longitude: '-103.6556709'
}, {
  name: 'Seadrift',
  latitude: '28.4152807',
  longitude: '-96.7135933'
}, {
  name: 'Seagraves',
  latitude: '32.9442651',
  longitude: '-102.564915'
}, {
  name: 'Seguin',
  latitude: '29.5688411',
  longitude: '-97.9647269'
}, {
  name: 'Seminole',
  latitude: '32.7189926',
  longitude: '-102.6449101'
}, {
  name: 'Seymour',
  latitude: '33.5942608',
  longitude: '-99.2603531'
}, {
  name: 'Shafter',
  latitude: '29.8201733',
  longitude: '-104.3032532'
}, {
  name: 'Shamrock',
  latitude: '35.2142167',
  longitude: '-100.2490075'
}, {
  name: 'Sheffield',
  latitude: '30.6904452',
  longitude: '-101.8226258'
}, {
  name: 'Sherman',
  latitude: '33.6356618',
  longitude: '-96.6088805'
}, {
  name: 'Sierra Blanca',
  latitude: '31.1745732',
  longitude: '-105.3571764'
}, {
  name: 'Silverton',
  latitude: '34.4742306',
  longitude: '-101.3046051'
}, {
  name: 'Slaton',
  latitude: '33.4373113',
  longitude: '-101.6434915'
}, {
  name: 'Snyder',
  latitude: '32.7178862',
  longitude: '-100.9176184'
}, {
  name: 'Socorro',
  latitude: '31.654557',
  longitude: '-106.3033145'
}, {
  name: 'Sonora',
  latitude: '30.5668484',
  longitude: '-100.6434273'
}, {
  name: 'Spearman',
  latitude: '36.1983665',
  longitude: '-101.1923795'
}, {
  name: 'Spring',
  latitude: '30.0799405',
  longitude: '-95.4171601'
}, {
  name: 'Spur',
  latitude: '33.4764767',
  longitude: '-100.8556857'
}, {
  name: 'Stamford',
  latitude: '32.9453874',
  longitude: '-99.8028709'
}, {
  name: 'Stanton',
  latitude: '32.1292891',
  longitude: '-101.7884642'
}, {
  name: 'Stephenville',
  latitude: '32.2206958',
  longitude: '-98.2022633'
}, {
  name: 'Sterling City',
  latitude: '31.8362502',
  longitude: '-100.9848324'
}, {
  name: 'Stratford',
  latitude: '36.3361402',
  longitude: '-102.0721191'
}, {
  name: 'Sudan',
  latitude: '34.0678644',
  longitude: '-102.5243624'
}, {
  name: 'Sugar Land',
  latitude: '29.6196787',
  longitude: '-95.6349463'
}, {
  name: 'Sulphur Springs',
  latitude: '33.1384479',
  longitude: '-95.6010668'
}, {
  name: 'Sunray',
  latitude: '36.0167027',
  longitude: '-101.824616'
}, {
  name: 'Sweetwater',
  latitude: '32.4709519',
  longitude: '-100.4059384'
}, {
  name: 'Temple',
  latitude: '31.0982344',
  longitude: '-97.342782'
}, {
  name: 'Texarkana',
  latitude: '33.425125',
  longitude: '-94.0476882'
}, {
  name: 'Texline',
  latitude: '36.3778066',
  longitude: '-103.0240968'
}, {
  name: 'Texon',
  latitude: '31.224874',
  longitude: '-101.6895665'
}, {
  name: 'The Woodlands',
  latitude: '30.1658207',
  longitude: '-95.4612625'
}, {
  name: 'Three Rivers',
  latitude: '28.4602717',
  longitude: '-98.1825071'
}, {
  name: 'Tulia',
  latitude: '34.5358942',
  longitude: '-101.7585159'
}, {
  name: 'Turkey',
  latitude: '34.3925639',
  longitude: '-100.8976408'
}, {
  name: 'Tyler',
  latitude: '32.3512601',
  longitude: '-95.3010624'
}, {
  name: 'Uvalde',
  latitude: '29.2096836',
  longitude: '-99.7861679'
}, {
  name: 'Valentine',
  latitude: '30.5873662',
  longitude: '-104.4965912'
}, {
  name: 'Van Horn',
  latitude: '31.0398558',
  longitude: '-104.8307698'
}, {
  name: 'Vega',
  latitude: '35.2428319',
  longitude: '-102.4282607'
}, {
  name: 'Vernon',
  latitude: '34.1545306',
  longitude: '-99.2650804'
}, {
  name: 'Victoria',
  latitude: '28.8052674',
  longitude: '-97.0035982'
}, {
  name: 'Wall',
  latitude: '31.3740447',
  longitude: '-100.3075293'
}, {
  name: 'Waco',
  latitude: '31.549333',
  longitude: '-97.1466695'
}, {
  name: 'Waka',
  latitude: '36.2815527',
  longitude: '-101.0482521'
}, {
  name: 'Wellington',
  latitude: '34.856166',
  longitude: '-100.2137263'
}, {
  name: 'Wheeler',
  latitude: '35.4453257',
  longitude: '-100.2709552'
}, {
  name: 'Whites City',
  latitude: '32.1756724',
  longitude: '-104.3766136'
}, {
  name: 'Wichita Falls',
  latitude: '33.9137085',
  longitude: '-98.4933873'
}, {
  name: 'Wickett',
  latitude: '31.5701328',
  longitude: '-103.0009898'
}, {
  name: 'Wink',
  latitude: '31.7512396',
  longitude: '-103.1598876'
}, {
  name: 'Winters',
  latitude: '31.9565343',
  longitude: '-99.962313'
}, {
  name: 'Woodville',
  latitude: '30.7752011',
  longitude: '-94.4154758'
}, {
  name: 'Woodway',
  latitude: '31.5059998',
  longitude: '-97.2050055'
}, {
  name: 'Zapata',
  latitude: '26.9072605',
  longitude: '-99.2714255'
}];

exports.seed = (knex, Promise) => knex('locations').del()
  .then(() => knex('locations').insert(locations))
  .then(() => knex('locations').where('name', locations[0].name).first()
    .then(location => knex('config').where('config', 'default').first()
      .update('defaultLocation', location.id)
    )
  )
  .then(() => Promise.all([
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Abeline' and ?? = 'Aspermont'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 97154;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Abeline' and ?? = 'Breckenridge'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 94887;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Abeline' and ?? = 'Cisco'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 72787;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Abeline' and ?? = 'Coleman'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 84425;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Abeline' and ?? = 'Stamford'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 64362;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Abeline' and ?? = 'Sweetwater'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 66652;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Abeline' and ?? = 'Winters'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 64385;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Ackerly' and ?? = 'Big Spring'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 39845;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Ackerly' and ?? = 'Lamesa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 32739;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Alice' and ?? = 'Corpus Christi'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 72593;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Alice' and ?? = 'Falfurrias'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 59749;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Alice' and ?? = 'George West'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 66093;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Alice' and ?? = 'Mathis'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 47744;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Alice' and ?? = 'San Diego'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 17424;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Allamoore' and ?? = 'Sierra Blanca'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 36302;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Allamoore' and ?? = 'Van Horn'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 18952;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Alpine' and ?? = 'Altuda'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 25098;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Alpine' and ?? = 'Fort Davis'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 38285;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Alpine' and ?? = 'Marfa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 42133;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Altuda' and ?? = 'Fort Stockton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 105631;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Altuda' and ?? = 'Marathon'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 24150;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Amarillo' and ?? = 'Canyon'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 30001;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Amarillo' and ?? = 'Claude'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 48439;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Amarillo' and ?? = 'Dumas'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 75675;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Amarillo' and ?? = 'Fritch'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 60378;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Amarillo' and ?? = 'Panhandle'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 44572;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Amarillo' and ?? = 'Vega'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 58453;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Andrews' and ?? = 'Big Spring'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 102127;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Andrews' and ?? = 'Kermit'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 74772;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Andrews' and ?? = 'Lamesa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 79742;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Andrews' and ?? = 'Odessa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 55522;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Andrews' and ?? = 'Seminole'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 45854;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Angeles' and ?? = 'Loving'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 46672;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Angeles' and ?? = 'Orla'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 9976;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Aransas Pass' and ?? = 'Port Aransas'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 13409;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Aransas Pass' and ?? = 'Portland'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 29704;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Aransas Pass' and ?? = 'Rockport'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 16544;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Arlington' and ?? = 'Dallas'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 34303;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Arlington' and ?? = 'Fort Worth'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 24415;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Asherton' and ?? = 'Carrizo Springs'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 13968;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Asherton' and ?? = 'Catarina'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 18732;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Aspermont' and ?? = 'Guthrie'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 56458;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Aspermont' and ?? = 'Haskell'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 49460;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Aspermont' and ?? = 'Knox City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 61412;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Aspermont' and ?? = 'Snyder'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 95186;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Aspermont' and ?? = 'Spur'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 77375;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Aspermont' and ?? = 'Stamford'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 49384;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Aspermont' and ?? = 'Sweetwater'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 87281;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Athens' and ?? = 'Canton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 39601;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Athens' and ?? = 'Corsicana'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 60059;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Athens' and ?? = 'Jacksonville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 63073;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Athens' and ?? = 'Palestine'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 55827;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Athens' and ?? = 'Tyler'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 58199;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Atlanta' and ?? = 'Jefferson'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51903;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Atlanta' and ?? = 'Texarkana'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 40634;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Austin' and ?? = 'Bastrop'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 53666;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Austin' and ?? = 'Fredricksburg'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 125786;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Austin' and ?? = 'Giddings'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 89064;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Austin' and ?? = 'Marble Falls'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 77946;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Austin' and ?? = 'Pflugerville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 28366;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Austin' and ?? = 'Round Rock'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 30755;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Austin' and ?? = 'San Marcos'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 50434;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Ballinger' and ?? = 'Coleman'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 57818;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Ballinger' and ?? = 'Eden'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 59584;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Ballinger' and ?? = 'San Angelo'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 68346;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Ballinger' and ?? = 'Winters'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 25422;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Balmorhea' and ?? = 'Fort Davis'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 59217;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Balmorhea' and ?? = 'Fort Stockton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 86384;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Balmorhea' and ?? = 'Saragosa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 12353;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Balmorhea' and ?? = 'Van Horn'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 110767;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bamhart' and ?? = 'Big Lake'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 28896;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bamhart' and ?? = 'Mertzon'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 39568;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bamhart' and ?? = 'Ozona'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 48333;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bamhart' and ?? = 'Sterling City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 83788;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bastrop' and ?? = 'Giddings'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 41641;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bastrop' and ?? = 'La Grange'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51411;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bastrop' and ?? = 'San Marcos'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 70304;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bay City' and ?? = 'El Campo'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51090;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bay City' and ?? = 'Lake Jackson'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 63693;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bay City' and ?? = 'Port Lavaca'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 81913;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Baytown' and ?? = 'Houston'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 42550;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Baytown' and ?? = 'Pasadena'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 29433;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Beaumont' and ?? = 'Houston'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 136150;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Beaumont' and ?? = 'Jasper'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 113089;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Beaumont' and ?? = 'Nederland'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 19078;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Beaumont' and ?? = 'Orange'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 46337;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Beaumont' and ?? = 'Woodville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 89898;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Beeville' and ?? = 'George West'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 38730;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Beeville' and ?? = 'Goliad'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 47163;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Beeville' and ?? = 'Kenedy'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51529;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Beeville' and ?? = 'Mathis'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 41319;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Belton' and ?? = 'Georgetown'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 53900;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Belton' and ?? = 'Harker Heights'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 21011;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Belton' and ?? = 'Temple'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 15438;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Big Lake' and ?? = 'Texon'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 23040;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Big Spring' and ?? = 'Colorado City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 61168;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Big Spring' and ?? = 'Stanton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 32901;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Big Spring' and ?? = 'Sterling City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 69966;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Boerne' and ?? = 'Comfort'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 26384;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Boerne' and ?? = 'San Antonio'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 50010;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Booker' and ?? = 'Perryton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 25717;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Borger' and ?? = 'Dumas'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 67299;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Borger' and ?? = 'Fritch'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 20950;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Borger' and ?? = 'Pampa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 45113;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Borger' and ?? = 'Panhandle'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 36830;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Borger' and ?? = 'Spearman'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 68405;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bowie' and ?? = 'Decatur'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 45054;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bowie' and ?? = 'Gainesville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 76115;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bowie' and ?? = 'Graham'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 99196;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bowie' and ?? = 'Wichita Falls'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 77220;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bracketville' and ?? = 'Del Rio'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 48722;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Bracketville' and ?? = 'Uvalde'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 63934;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brady' and ?? = 'Brownwood'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 74119;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brady' and ?? = 'Llano'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 85165;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brady' and ?? = 'Mason'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 46262;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brady' and ?? = 'Melvin'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 28150;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brady' and ?? = 'Menard'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 54356;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brady' and ?? = 'San Saba'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 67349;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brady' and ?? = 'Santa Anna'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 72028;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Breckenridge' and ?? = 'Cisco'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 44938;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Breckenridge' and ?? = 'Fort Worth'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 162671;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Breckenridge' and ?? = 'Graham'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 53223;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Breckenridge' and ?? = 'Haskell'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 111434;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Breckenridge' and ?? = 'Seymour'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 108860;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Breckenridge' and ?? = 'Stamford'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 97694;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brenham' and ?? = 'Giddings'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 54697;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brenham' and ?? = 'Katy'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 108324;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brenham' and ?? = 'La Grange'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 61973;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brenham' and ?? = 'Navasota'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 40246;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brownfield' and ?? = 'Lamesa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 61563;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brownfield' and ?? = 'Levelland'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 47688;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brownfield' and ?? = 'Lubbock'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 62954;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brownfield' and ?? = 'Plains'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51916;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brownfield' and ?? = 'Post'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 84500;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brownfield' and ?? = 'Seagraves'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 38370;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brownsville' and ?? = 'Harlingen'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 42278;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brownwood' and ?? = 'Cisco'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 79166;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brownwood' and ?? = 'Comanche'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 43921;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Brownwood' and ?? = 'Santa Anna'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 33235;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Burkburnett' and ?? = 'Wichita Falls'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 24437;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Burnet' and ?? = 'Georgetown'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 56815;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Burnet' and ?? = 'Lampasas'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 35523;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Burnet' and ?? = 'Llano'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 47647;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Burnet' and ?? = 'Marble Falls'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 20827;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cactus' and ?? = 'Dumas'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 21413;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cactus' and ?? = 'Stratford'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 33191;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cactus' and ?? = 'Sunray'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 20030;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Canadian' and ?? = 'Pampa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 74781;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Canadian' and ?? = 'Perryton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 74518;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Canadian' and ?? = 'Wheeler'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 55463;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Canton' and ?? = 'Dallas'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 95349;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Canton' and ?? = 'Lindale'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 49319;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Canton' and ?? = 'Sulphur Springs'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 72083;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Canton' and ?? = 'Tyler'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 64391;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Canyon' and ?? = 'Hereford'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 49685;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Canyon' and ?? = 'Tulia'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 53504;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Carlsbad' and ?? = 'Hobbes'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 112101;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Carlsbad' and ?? = 'Loving'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 20682;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Carlsbad' and ?? = 'Whites City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 32464;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Carrizo Springs' and ?? = 'Crystal City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 19147;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Carrizo Springs' and ?? = 'Dilley'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 72257;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Carta Valley' and ?? = 'Del Rio'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 60411;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Carta Valley' and ?? = 'RockSprings'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 63672;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Carthage' and ?? = 'Center'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 48083;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Carthage' and ?? = 'Henderson'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 44569;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Carthage' and ?? = 'Marshall'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 45587;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Catarina' and ?? = 'Enical'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 56688;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Catarina' and ?? = 'Laredo'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 97698;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Center' and ?? = 'Nacogdoches'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 53541;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Center' and ?? = 'San Augustine'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 32693;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Childress' and ?? = 'Memphis'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 49180;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Childress' and ?? = 'Paducah'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51746;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Childress' and ?? = 'Quanah'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 46449;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Childress' and ?? = 'Turkey'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 75362;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Childress' and ?? = 'Wellington'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 50912;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Chilicothe' and ?? = 'Quanah'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 22470;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Chilicothe' and ?? = 'Vernon'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 27564;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cisco' and ?? = 'Coleman'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 81235;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cisco' and ?? = 'Comanche'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 76016;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cisco' and ?? = 'Eastland'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 15688;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cisco' and ?? = 'Stamford'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 131707;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Clarendon' and ?? = 'Goodnight'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 31134;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Clarendon' and ?? = 'Groom'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 47335;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Clarendon' and ?? = 'Memphis'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 42864;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Clarendon' and ?? = 'Turkey'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 68960;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Clarksville' and ?? = 'New Boston'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 62810;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Clarksville' and ?? = 'Paris'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 48749;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Claude' and ?? = 'Goodnight'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 19874;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Claude' and ?? = 'Groom'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 34478;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Claude' and ?? = 'Panhandle'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 28006;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Claude' and ?? = 'Silverton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 84225;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Coleman' and ?? = 'Santa Anna'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 14721;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Coleman' and ?? = 'Winters'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 56221;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'College Station' and ?? = 'Hearne'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 42217;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'College Station' and ?? = 'Huntsville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 83770;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'College Station' and ?? = 'Madisonville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 66095;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'College Station' and ?? = 'Navasota'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 38635;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Colorado City' and ?? = 'Snyder'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 40227;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Colorado City' and ?? = 'Sterling City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 71621;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Colorado City' and ?? = 'Sweetwater'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 45160;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Columbus' and ?? = 'El Campo'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 63279;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Columbus' and ?? = 'Gonzales'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 100430;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Columbus' and ?? = 'Katy'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 71625;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Columbus' and ?? = 'La Grange'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 42536;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Comanche' and ?? = 'Gatesville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 105248;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Comanche' and ?? = 'Stephenville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 57196;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Comfort' and ?? = 'Fredricksburg'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 36433;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Comfort' and ?? = 'Kerrville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 28987;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Commerce' and ?? = 'Sulphur Springs'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 31929;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Concan' and ?? = 'Leakey'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 27346;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Concan' and ?? = 'Uvalde'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 37028;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Conroe' and ?? = 'Huntsville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 50211;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Conroe' and ?? = 'Navasota'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 67195;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Conroe' and ?? = 'The Woodlands'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 17279;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Copperas Cove' and ?? = 'Killeen'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 16894;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Copperas Cove' and ?? = 'Lampasas'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 30563;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cornudas' and ?? = 'El Paso'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 110454;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cornudas' and ?? = 'Pine Springs'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 81550;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Corpus Christi' and ?? = 'Kingsville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 71607;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Corpus Christi' and ?? = 'Mathis'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 59073;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Corpus Christi' and ?? = 'Portland'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 14398;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Corsicana' and ?? = 'Dallas'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 88679;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Corsicana' and ?? = 'Fairfield'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 54596;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Corsicana' and ?? = 'Hilsboro'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 65815;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Corsicana' and ?? = 'Waco'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 90320;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cotulla' and ?? = 'Dilley'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 26552;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cotulla' and ?? = 'Enical'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 46761;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cotulla' and ?? = 'Three Rivers'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 110312;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crane' and ?? = 'McCarney'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 34284;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crane' and ?? = 'Odessa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51522;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crockett' and ?? = 'Huntsville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 77489;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crockett' and ?? = 'Lufkin'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 73629;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crockett' and ?? = 'Madisonville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 62472;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crockett' and ?? = 'Nacogdoches'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 87272;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crockett' and ?? = 'Palestine'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 56765;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crockett' and ?? = 'Rusk'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 73005;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crosbyton' and ?? = 'Floydada'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 46124;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crosbyton' and ?? = 'Lubbock'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 61103;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crosbyton' and ?? = 'Post'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 60563;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crosbyton' and ?? = 'Spur'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 50325;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crowell' and ?? = 'Knox City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 65389;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crowell' and ?? = 'Paducah'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 58275;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crowell' and ?? = 'Quanah'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 35379;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crowell' and ?? = 'Vernon'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 52594;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Crystal City' and ?? = 'Uvalde'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 62740;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cuero' and ?? = 'Edna'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 79443;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cuero' and ?? = 'Goliad'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 50432;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cuero' and ?? = 'Gonzales'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 52209;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cuero' and ?? = 'Kenedy'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 66647;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Cuero' and ?? = 'Victoria'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 44488;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dalhart' and ?? = 'Dumas'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 61204;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dalhart' and ?? = 'Perico'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 41475;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dalhart' and ?? = 'Stratford'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51090;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dalhart' and ?? = 'Vega'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 103596;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dallas' and ?? = 'Fort Worth'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 53388;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dallas' and ?? = 'Gainesville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 114502;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dallas' and ?? = 'Hilsboro'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 99941;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dallas' and ?? = 'Plano'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 32290;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dallas' and ?? = 'Sulphur Springs'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 127023;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Decatur' and ?? = 'Fort Worth'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 64846;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Decatur' and ?? = 'Graham'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 105815;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Del Rio' and ?? = 'Juno'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 113761;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Del Rio' and ?? = 'Langtry'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 96670;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Del Rio' and ?? = 'Laughlin AFB'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 11869;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Denison' and ?? = 'Sherman'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 18663;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Denver City' and ?? = 'Plains'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 26369;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Denver City' and ?? = 'Seagraves'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 26965;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Denver City' and ?? = 'Seminole'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 33992;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Diboll' and ?? = 'Livingston'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 56617;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Diboll' and ?? = 'Lufkin'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 18139;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dilley' and ?? = 'Pearsall'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 26206;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dimmitt' and ?? = 'Friona'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51796;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dimmitt' and ?? = 'Hereford'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 33254;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dimmitt' and ?? = 'Littlefield'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 71323;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dimmitt' and ?? = 'Tulia'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51810;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dryden' and ?? = 'Langtry'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 64719;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dryden' and ?? = 'Sanderson'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 33078;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Dryden' and ?? = 'Sheffield'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 94845;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Eastland' and ?? = 'Ranger'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 16254;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Eden' and ?? = 'Melvin'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 27989;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Eden' and ?? = 'Menard'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 34677;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Eden' and ?? = 'Wall'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51527;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Edinburg' and ?? = 'Falfurrias'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 106913;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Edinburg' and ?? = 'McAllen'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 18936;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Edna' and ?? = 'El Campo'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 44814;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Edna' and ?? = 'Victoria'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 40510;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'El Campo' and ?? = 'Rosenburg'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 62763;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'El Paso' and ?? = 'Socorro'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 25812;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Eldorado' and ?? = 'Menard'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 81457;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Eldorado' and ?? = 'San Angelo'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 71858;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Eldorado' and ?? = 'Sonora'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 34612;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Enical' and ?? = 'Freer'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 76780;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Enical' and ?? = 'Laredo'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 61718;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fairfield' and ?? = 'Madisonville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 92335;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fairfield' and ?? = 'Palestine'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 57611;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fairfield' and ?? = 'Waco'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 103024;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Falfurrias' and ?? = 'Hebbronville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 55984;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Falfurrias' and ?? = 'Riviera'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 36079;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Floresville' and ?? = 'Kames City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 39482;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Floresville' and ?? = 'Pleasanton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 38029;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Floresville' and ?? = 'San Antonio'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 48772;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Floydada' and ?? = 'Matador'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 50809;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Floydada' and ?? = 'Plainview'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 44095;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Floydada' and ?? = 'Silverton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 57363;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Davis' and ?? = 'Marfa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 34023;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Hancock' and ?? = 'Sierra Blanca'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 55525;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Hancock' and ?? = 'Socorro'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 65218;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Stockton' and ?? = 'Grandfalls'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51965;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Stockton' and ?? = 'Marathon'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 94220;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Stockton' and ?? = 'McCarney'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 75009;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Stockton' and ?? = 'Pecos'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 85176;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Stockton' and ?? = 'Sanderson'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 105254;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Stockton' and ?? = 'Saragosa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 81424;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Stockton' and ?? = 'Sheffield'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 114956;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Worth' and ?? = 'Gainesville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 104906;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Worth' and ?? = 'Granbury'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 61193;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Worth' and ?? = 'Hilsboro'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 90150;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fort Worth' and ?? = 'Ranger'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 137121;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fredricksburg' and ?? = 'Junction'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 98629;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fredricksburg' and ?? = 'Kerrville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 39193;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fredricksburg' and ?? = 'Llano'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 61869;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Fredricksburg' and ?? = 'Mason'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 67644;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Freer' and ?? = 'George West'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 72095;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Freer' and ?? = 'Hebbronville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 65278;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Freer' and ?? = 'Laredo'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 95733;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Freer' and ?? = 'San Diego'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 40206;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Friona' and ?? = 'Hereford'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 36132;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Friona' and ?? = 'Muleshoe'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 47005;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Gail' and ?? = 'Lamesa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 50990;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Gail' and ?? = 'Snyder'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 50276;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Gainesville' and ?? = 'Sherman'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 55491;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Galveston' and ?? = 'Pasadena'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 67702;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Garden City' and ?? = 'Midland'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 59547;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Garden City' and ?? = 'Sterling City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51159;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Gatesville' and ?? = 'Stephenville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 105454;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Gatesville' and ?? = 'Temple'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 57090;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Gatesville' and ?? = 'Woodway'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 53247;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'George West' and ?? = 'Mathis'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 44689;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'George West' and ?? = 'Three Rivers'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 15927;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Georgetown' and ?? = 'Lampasas'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 79248;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Georgetown' and ?? = 'Round Rock'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 15033;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Giddings' and ?? = 'La Grange'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 32924;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Gilmer' and ?? = 'Kilgore'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 44470;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Gilmer' and ?? = 'Marshall'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 63640;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Gilmer' and ?? = 'Pittsburg'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 30368;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Gilmer' and ?? = 'Tyler'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 58136;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Goliad' and ?? = 'Kenedy'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51388;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Goliad' and ?? = 'Victoria'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 41882;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Gonzales' and ?? = 'Seguin'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 53476;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Graham' and ?? = 'Wichita Falls'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 97807;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Granbury' and ?? = 'Stephenville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 47611;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Grandfalls' and ?? = 'Monahans'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 29080;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Grape Creek' and ?? = 'San Angelo'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 20286;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Grape Creek' and ?? = 'Sterling City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 55520;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Groom' and ?? = 'McLean'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 48862;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Groom' and ?? = 'Pampa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 47093;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Guthrie' and ?? = 'Knox City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 55555;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Guthrie' and ?? = 'Paducah'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 45052;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Guthrie' and ?? = 'Spur'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 67571;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Harker Heights' and ?? = 'Killeen'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 8673;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Harlingen' and ?? = 'McAllen'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 56601;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Harlingen' and ?? = 'Riviera'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 128488;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Haskell' and ?? = 'Knox City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 36769;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Haskell' and ?? = 'Munday'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 35174;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Haskell' and ?? = 'Stamford'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 26908;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Hearne' and ?? = 'Waco'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 106028;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Hebbronville' and ?? = 'Laredo'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 90782;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Hebbronville' and ?? = 'San Diego'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 69092;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Hebbronville' and ?? = 'Zapata'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 82854;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Henderson' and ?? = 'Jacksonville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 52270;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Henderson' and ?? = 'Kilgore'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 28086;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Henderson' and ?? = 'Marshall'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 64721;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Henderson' and ?? = 'Nacogdoches'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 67222;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Henderson' and ?? = 'Tyler'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 54949;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Hereford' and ?? = 'Vega'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 49136;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Hermleigh' and ?? = 'Snyder'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 18908;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Hermleigh' and ?? = 'Sweetwater'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 43761;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Hilsboro' and ?? = 'Waco'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 54618;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Hobbes' and ?? = 'Seminole'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 47608;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Houston' and ?? = 'Katy'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 47798;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Houston' and ?? = 'Livingston'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 118919;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Houston' and ?? = 'Pasadena'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 26473;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Houston' and ?? = 'Pearland'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 37311;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Houston' and ?? = 'Spring'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 38470;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Houston' and ?? = 'Sugar Land'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 32688;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Huntsville' and ?? = 'Livingston'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 69201;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Huntsville' and ?? = 'Madisonville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 46423;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Iowa Park' and ?? = 'Vernon'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 62916;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Iowa Park' and ?? = 'Wichita Falls'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 20730;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Iraan' and ?? = 'Rankin'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 43514;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Iraan' and ?? = 'Sheffield'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 29127;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Jacksonville' and ?? = 'Palestine'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 41991;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Jacksonville' and ?? = 'Rusk'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 22518;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Jacksonville' and ?? = 'Tyler'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 44163;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Jasper' and ?? = 'Lufkin'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 89152;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Jasper' and ?? = 'San Augustine'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 72711;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Jasper' and ?? = 'Woodville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 44817;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Jefferson' and ?? = 'Marshall'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 27074;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Junction' and ?? = 'Kerrville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 84326;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Junction' and ?? = 'Leakey'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 98729;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Junction' and ?? = 'Mason'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 71415;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Junction' and ?? = 'Menard'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 50005;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Junction' and ?? = 'RockSprings'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 75271;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Junction' and ?? = 'Sonora'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 92348;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Juno' and ?? = 'Ozona'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 68650;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Kames City' and ?? = 'Kenedy'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 9660;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Katy' and ?? = 'Spring'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 70903;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Katy' and ?? = 'Sugar Land'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 34544;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Kenedy' and ?? = 'Three Rivers'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 53610;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Kermit' and ?? = 'Mentone'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 52333;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Kermit' and ?? = 'Monahans'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 37265;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Kermit' and ?? = 'Odessa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 73486;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Kermit' and ?? = 'Wink'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 14222;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Kilgore' and ?? = 'Lindale'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 57476;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Kilgore' and ?? = 'Longview'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 18799;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Kilgore' and ?? = 'Tyler'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 41649;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Kingsville' and ?? = 'Riviera'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 26599;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Knox City' and ?? = 'Munday'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 19465;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Lake Jackson' and ?? = 'Pearland'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 5000;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Lakeview' and ?? = 'Memphis'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 16500;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Lamesa' and ?? = 'Seminole'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 65884;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Lampasas' and ?? = 'San Saba'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 59080;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Langtry' and ?? = 'Pandale'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 129025;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Laredo' and ?? = 'Rio Bravo'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 26594;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Levelland' and ?? = 'Littlefield'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 38601;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Levelland' and ?? = 'Lubbock'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 49355;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Levelland' and ?? = 'Morton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 41979;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Lindale' and ?? = 'Mineola'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 19108;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Lindale' and ?? = 'Tyler'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 22262;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Littlefield' and ?? = 'Lubbock'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 58999;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Littlefield' and ?? = 'Sudan'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 25274;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Livingston' and ?? = 'Woodville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 52306;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Llano' and ?? = 'Marble Falls'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 52362;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Llano' and ?? = 'Mason'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 55642;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Llano' and ?? = 'San Saba'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 52438;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Longview' and ?? = 'Marshall'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 36783;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Lubbock' and ?? = 'Plainview'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 76134;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Lubbock' and ?? = 'Slaton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 27077;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Lufkin' and ?? = 'Nacogdoches'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 32080;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Marathon' and ?? = 'Rosenfeld'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 69210;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Marfa' and ?? = 'Ryan'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 32069;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Marfa' and ?? = 'Shafter'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 64265;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Mason' and ?? = 'Menard'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 61766;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Matador' and ?? = 'Paducah'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 50163;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Matador' and ?? = 'Spur'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 62088;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Matador' and ?? = 'Turkey'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 45701;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'McAllen' and ?? = 'Zapata'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 153044;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'McCarney' and ?? = 'Rankin'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 30845;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'McLean' and ?? = 'Memphis'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 67328;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'McLean' and ?? = 'Pampa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 57422;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'McLean' and ?? = 'Shamrock'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 33817;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Mentone' and ?? = 'Orla'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 42402;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Mentone' and ?? = 'Pecos'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 36633;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Mertzon' and ?? = 'San Angelo'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 46430;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Midland' and ?? = 'Odessa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 36335;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Midland' and ?? = 'Stanton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 31147;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Mineola' and ?? = 'Sulphur Springs'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 58969;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Monahans' and ?? = 'Odessa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 57519;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Monahans' and ?? = 'Wickett'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 11115;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Morton' and ?? = 'Muleshoe'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 56465;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Morton' and ?? = 'Plains'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 62878;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Mt Pleasant' and ?? = 'Mt Vernon'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 25599;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Mt Pleasant' and ?? = 'New Boston'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 65493;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Mt Pleasant' and ?? = 'Pittsburg'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 18969;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Mt Vernon' and ?? = 'Sulphur Springs'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 38870;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Muleshoe' and ?? = 'Plainview'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 95874;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Muleshoe' and ?? = 'Sudan'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 25583;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Munday' and ?? = 'Seymour'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 39824;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Nacogdoches' and ?? = 'Rusk'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 57362;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Nacogdoches' and ?? = 'San Augustine'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 56557;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Nederland' and ?? = 'Port Arthur'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 14688;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'New Boston' and ?? = 'Texarkana'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 38675;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'New Braunfels' and ?? = 'San Antonio'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 54540;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'New Braunfels' and ?? = 'San Marcos'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 30472;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'New Braunfels' and ?? = 'Seguin'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 24626;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Orange' and ?? = 'Port Arthur'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 36902;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Ozona' and ?? = 'Sheffield'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 67936;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Ozona' and ?? = 'Sonora'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 57106;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Palestine' and ?? = 'Rusk'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 48928;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pampa' and ?? = 'Panhandle'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 44955;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pampa' and ?? = 'Perryton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 100860;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pampa' and ?? = 'Wheeler'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 67682;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Paris' and ?? = 'Sherman'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 103224;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Paris' and ?? = 'Sulphur Springs'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 60885;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pasadena' and ?? = 'Pearland'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 33547;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pearland' and ?? = 'Sugar Land'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 41894;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pearsall' and ?? = 'San Antonio'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 88680;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pecos' and ?? = 'Saragosa'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 50164;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pecos' and ?? = 'Van Horn'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 145605;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pecos' and ?? = 'Wickett'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 51202;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Perico' and ?? = 'Texline'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 18953;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Perryton' and ?? = 'Waka'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 26253;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pflugerville' and ?? = 'Round Rock'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 12321;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pine Springs' and ?? = 'Whites City'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 56761;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Plainview' and ?? = 'Tulia'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 41875;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Plano' and ?? = 'Sherman'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 74062;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pleasanton' and ?? = 'San Antonio'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 58622;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Pleasanton' and ?? = 'Three Rivers'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 67442;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Port Lavaca' and ?? = 'Port O''Connor'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 39722;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Port Lavaca' and ?? = 'Seadrift'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 28686;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Port Lavaca' and ?? = 'Victoria'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 44610;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Port O''Connor' and ?? = 'Seadrift'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 30843;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Post' and ?? = 'Slaton'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 38253;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Post' and ?? = 'Snyder'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 70997;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Quebec' and ?? = 'Ryan'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 16130;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Quebec' and ?? = 'Valentine'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 12850;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Ranger' and ?? = 'Stephenville'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 68339;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Rankin' and ?? = 'Texon'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 24862;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Rio Bravo' and ?? = 'Zapata'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 61892;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'RockSprings' and ?? = 'Sonora'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 88498;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'RockSprings' and ?? = 'Uvalde'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 110436;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Rockport' and ?? = 'Seadrift'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 79320;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Rosenburg' and ?? = 'Sugar Land'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 19031;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Rosenfeld' and ?? = 'Sanderson'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 40305;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'San Angelo' and ?? = 'Wall'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 22956;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'San Antonio' and ?? = 'Seguin'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 58628;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'San Antonio' and ?? = 'Uvalde'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 137262;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'San Marcos' and ?? = 'Seguin'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 35369;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Seadrift' and ?? = 'Victoria'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 52954;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Seagraves' and ?? = 'Seminole'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 27991;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Seymour' and ?? = 'Vernon'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 73961;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Seymour' and ?? = 'Wichita Falls'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 83822;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Shamrock' and ?? = 'Wellington'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 41802;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Shamrock' and ?? = 'Wheeler'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 27304;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Silverton' and ?? = 'Tulia'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 43170;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Silverton' and ?? = 'Turkey'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 42235;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Snyder' and ?? = 'Spur'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 97740;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Spearman' and ?? = 'Stratford'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 86024;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Spearman' and ?? = 'Waka'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 16408;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Spring' and ?? = 'The Woodlands'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 14011;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Stamford' and ?? = 'Sweetwater'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 89955;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Sweetwater' and ?? = 'Winters'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 78274;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Temple' and ?? = 'Waco'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 55814;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Temple' and ?? = 'Woodway'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 54112;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Valentine' and ?? = 'Van Horn'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 62270;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Waco' and ?? = 'Woodway'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 8081;
      return knex('connections').insert(thingy);
    }),
    knex(knex.raw('locations c1, locations c2'))
    .select('c1.id as city1', 'c2.id as city2')
    .whereRaw("?? = 'Wickett' and ?? = 'Wink'", ['c1.name', 'c2.name'])
    .first()
    .then((thingy) => {
      thingy.distance = 35299;
      return knex('connections').insert(thingy);
    }),
  ]));
