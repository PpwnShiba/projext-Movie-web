var mongoose = require('mongoose'),
    movies = require('./models/movies'),
    moviesComingsoon = require('./models/movies_comingsoon'),
    comment = require('./models/comments'),
    Location = require('./models/location');
const seat = require('./models/seat');
const user = require('./models/user');

var data_now= [
    {
        name: 'Godzilla vs Kong',
        image: 'https://mlpnk72yciwc.i.optimole.com/cqhiHLc.WqA8~2eefa/w:600/h:888/q:75/https://bleedingcool.com/wp-content/uploads/2021/03/godzilla_vs_kong_ver12_xlg.jpg',
        score: 9,
        header: 'https://images.indianexpress.com/2021/03/godzilla-vs-kong-1200.jpg',
        rate: 'PG-13: Parents Strongly Cautioned',
        time: '113 min',
        genre: 'Action',
        ReleaseDate: '31 March 2021',
        Director: 'Adam Wingard',
        title: 'As the gigantic Kong meets the unstoppable Godzilla, the world watches to see which one of them will become King of the Monsters.',
        video: 'odM92ap8_c0'

    },
    {
        name: 'Pokemon Detective Pikachu',
        image: 'https://i.pinimg.com/originals/e1/e4/3f/e1e43fbbf1131acf161e0062e53479ca.jpg',
        score: 8,
        header: 'https://www.chicagotribune.com/resizer/p5wYVm10FkAYJpN-OJPu8_joqr8=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/VPLDGI7QUVGFVKEIRQ67ZWTMNI.jpg',
        rate: 'General',
        time: '104 min',
        genre: 'Action',
        ReleaseDate: '10 May 2019',
        Director: 'Rob Letterman',
        title: 'The story begins when ace detective Harry Goodman goes mysteriously missing, prompting his 21-year-old son Tim to find out what happened. Aiding in the investigation is Harry’s former Pokémon partner, Detective Pikachu: a hilariously wise-cracking, adorable super-sleuth who is a puzzlement even to himself. Finding that they are uniquely equipped to communicate with one another, Tim and Pikachu join forces on a thrilling adventure to unravel the tangled mystery. Chasing clues together through the neon-lit streets of Ryme City—a sprawling, modern metropolis where humans and Pokémon live side by side in a hyper-realistic live-action world—they encounter a diverse cast of Pokémon characters and uncover a shocking plot that could destroy this peaceful co-existence and threaten the whole Pokémon universe.',
        video: '1roy4o4tqQM'
    }, 
    {
        name: 'Spider-Man: Far From Home',
        image: 'https://images-na.ssl-images-amazon.com/images/I/810OkkP0LnL._AC_SL1305_.jpg',
        score: 9.5,
        header: 'https://cdn.majorcineplex.com/uploads/content/images/download%2824%29.jpg',
        rate: 'PG-13: Parents Strongly Cautioned',
        time: '129 min',
        genre: 'Action',
        ReleaseDate: '5 July 2019',
        Director: 'Jon Watts',
        title: 'Peter Parker returns in Spider-Man: Far From Home, the next chapter of the Spider-Man: Homecoming series! Our friendly neighborhood Super Hero decides to join his best friends Ned, MJ, and the rest of the gang on a European vacation. However, Peter’s plan to leave super heroics behind for a few weeks are quickly scrapped when he begrudgingly agrees to help Nick Fury uncover the mystery of several elemental creature attacks, creating havoc across the continent!',
        video: 'Nt9L1jCKGnE'
    },
    {
        name: 'Spider-Man: Homecoming',
        image: 'https://i.pinimg.com/originals/f5/b1/a6/f5b1a65cdf95f0cec0b949283aa35fc6.jpg',
        score: 9.5,
        header: 'https://images.squarespace-cdn.com/content/v1/51b3dc8ee4b051b96ceb10de/1561156496618-S6X7S57MRJ8P9ZH0TUI9/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/marvel-director-jon-watts-confirms-howard-the-duck-easter-egg-in-spider-man-homecoming-social.jpg?format=2500w',
        rate: 'PG-13: Parents Strongly Cautioned',
        time: '130 min',
        genre: 'Action',
        ReleaseDate: '7 July 2017',
        Director: 'Jon Watts, John Francis Daley, Christopher Ford, Chris McKenna, Erik Sommers',
        title: 'A young Peter Parker attempts to balance high school with being the superhero Spider-Man.',
        video: 'n9DwoQ7HWvI'
    },
    {
        name:'Guardians of the Galaxy',
        image:'https://m.media-amazon.com/images/I/71uVKw4XhjL._AC_.jpg',
        score: 8,
        header: 'https://deadline.com/wp-content/uploads/2020/12/MCDGUOF_EC215-e1607651440401.jpg',
        rate: 'PG-13: Parents Strongly Cautioned',
        time: '121 min',
        genre: 'Sci-Fi',
        ReleaseDate: '1 August 2014',
        Director: 'James Gunn',
        title: 'An action-packed, epic space adventure, Marvel “Guardians of the Galaxy” expands the Marvel Cinematic Universe into the cosmos, where brash adventurer Peter Quill finds himself the object of an unrelenting bounty hunt after stealing a mysterious orb coveted by Ronan, a powerful villain with ambitions that threaten the entire universe. To evade the ever-persistent Ronan, Quill is forced into an uneasy truce with a quartet of disparate misfits—Rocket, a gun-toting raccoon, Groot, a tree-like humanoid, the deadly and enigmatic Gamora and the revenge-driven Drax the Destroyer. But when Quill discovers the true power of the orb and the menace it poses to the cosmos, he must do his best to rally his ragtag rivals for a last, desperate stand—with the galaxy fate in the balance.',
        video: 'd96cjJhvlMA'

    },
    {
        name:'The Call of the Wild',
        image:'https://bloximages.chicago2.vip.townnews.com/newsbug.info/content/tncms/assets/v3/editorial/e/bd/ebde8e37-ef57-5b1b-ad4c-c9309d7b791b/5e52e5f2dbdc4.image.jpg',
        score: 8,
        header: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/3affb5380cc882b8a2023dc9bb349bb5088850781ac2be07be05aa31bdfde0b3._V_SX1080_.jpg',
        rate: 'Parental Guidance Suggested',
        time: '105 min',
        genre: 'Family',
        ReleaseDate: '21 February 2020',
        Director: 'Chris Sanders',
        title: 'Adapted from the beloved literary classic, 20th Century Fox THE CALL OF THE WILD vividly brings to the screen the story of Buck, a big-hearted dog whose blissful domestic life is turned upside down when he is suddenly uprooted from his California home and transplanted to the exotic wilds of the Alaskan Yukon during the Gold Rush of the 1890s. As the newest rookie on a mail delivery dog sled team--and later its leader--Buck experiences the adventure of a lifetime, ultimately finding his true place in the world and becoming his own master. As a live-action/animation hybrid, THE CALL OF THE WILD employs cutting edge visual effects and animation technology in order to render the animals in the film as fully photorealistic--and emotionally authentic--characters.',
        video: '5P8R2zAhEwg'
    },
    {
        name:'Pixels',
        image:'https://i.pinimg.com/originals/b1/69/ab/b169ab97bc588ecad64f2a907ea5d218.jpg',
        score: 7,
        header: 'https://cdn.majorcineplex.com/uploads/content/images/2848306-pixels_movie4.jpg',
        rate: 'PG-13: Parents Strongly Cautioned',
        time: '105 min',
        genre: 'Sci-Fi',
        ReleaseDate: '24 July 2015',
        Director: 'Chris Columbus',
        title: 'In Pixels, when intergalactic aliens misinterpret video-feeds of classic arcade games as a declaration of war against them, they attack the Earth, using the games as models for their various assaults. President Will Cooper (Kevin James) has to call on his childhood best friend, ’80s video game champion Sam Brenner (Adam Sandler), now a home theater installer, to lead a team of old-school arcaders (Peter Dinklage and Josh Gad) to defeat the aliens and save the planet. Joining them is Lt. Col. Violet Van Patten (Michelle Monaghan), a specialist supplying the arcaders with unique weapons to fight the aliens.',
        video: 'XAHprLW48no'
    },
    {
        name:'Toy Story 4',
        image:'https://www.bkkmenu.com/files/2019/06/MV5BMTYzMDM4NzkxOV5BMl5BanBnXkFtZTgwNzM1Mzg2NzM_V1_.jpg',
        score: 8,
        header: 'http://www.kwanmanie.com/wp-content/uploads/2019/06/ToyStory4-WOODY_FORKY.jpg',
        rate: 'General',
        time: '89 min',
        genre: 'Animated',
        ReleaseDate: '21 June 2019',
        Director: 'Josh Cooley',
        title: 'Woody has always been confident about his place in the world and that his priority is taking care of his kid, whether that’s Andy or Bonnie. But when Bonnie adds a reluctant new toy called “Forky” to her room, a road trip adventure alongside old and new friends will show Woody how big the world can be for a toy. Directed by Josh Cooley (“Riley’s First Date?”) and produced by Jonas Rivera (“Inside Out,” “Up”) and Mark Nielsen (associate producer “Inside Out”), Disney•Pixar’s “Toy Story 4” ventures to U.S. theaters on June 21, 2019.',
        video: 'wmiIUN-7qhE'
    },
    {
        name:'Deadpool',
        image:'https://images-na.ssl-images-amazon.com/images/I/91qmrdkBViL._AC_SL1500_.jpg',
        score: 8.5,
        header: 'https://media1.popsugar-assets.com/files/thumbor/_5scOl3noOJnKpZsScx05LBcnGs/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2018/05/23/945/n/1922283/tmp_zaCgRO_4d9c4b4e87b3b69f_MCDDEAD_FE014.jpg',
        rate: 'Restricted',
        time: '108 min',
        genre: 'Action',
        ReleaseDate: '12 February 2016 ',
        Director: 'Tim Miller',
        title: 'Based upon Marvel Comics’ most unconventional anti-hero, DEADPOOL tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.',
        video: 'FyKWUTwSYAs'
    },
    {
        name:'Big Hero 6',
        image:'https://ohmy.disney.com/wp-content/uploads/2014/10/big_hero_6_poster_malaysia.jpg',
        score: 9,
        header: 'https://www.teahub.io/photos/full/208-2082636_sad-big-hero-6.jpg',
        rate: ' Parental Guidance Suggested',
        time: '108 min',
        genre: 'Animated',
        ReleaseDate: '7 November 2014',
        Director: 'Don Hall, Chris Williams',
        title:'From Walt Disney Animation Studios comes "Big Hero 6," an action comedy adventure about brilliant robotics prodigy Hiro Hamada, who finds himself in the grips of a criminal plot that threatens to destroy the fast-paced, high-tech city of San Fransokyo. With the help of his closest companion—a robot named Baymax—Hiro joins forces with a reluctant team of first-time crime fighters on a mission to save their city. Inspired by the Marvel comics of the same name, and featuring comic-book style action and all the heart and humor audiences expect from Walt Disney Animation Studios',
        video: 'd2S8D_SCAJY'
    },
    {
        name:'Wreck-It Ralph',
        image:'https://www.bestmovieposters.co.uk/wp-content/uploads/2019/01/KIqYBZhQ.jpeg',
        score: 9,
        header: 'https://images.squarespace-cdn.com/content/53f119fde4b0cc6081eeaacb/1542406830098-RVNTUOP8FEJEY2TXEJR5/wreckitralph.jpg?content-type=image%2Fjpeg',
        rate: 'Parental Guidance Suggested',
        time: '93 min',
        genre: 'Animated',
        ReleaseDate: '2 November 2012',
        Director: 'Rich Moore',
        title: 'Walt Disney Animation Studios and Emmy®-winning director Rich Moore take moviegoers on a hilarious, video-game-hopping journey in "Wreck-It Ralph," the story of an arcade game Bad Guy determined to prove he can be a Good Guy. Wreck-It Ralph (voice of John C. Reilly) longs to be as beloved as his game perfect Good Guy, Fix-It Felix (voice of Jack McBrayer). Problem is, nobody loves a Bad Guy. But they do love heroes... so when a modern, first-person shooter game arrives featuring tough-as-nails Sergeant Calhoun (voice of Jane Lynch), Ralph sees it as his ticket to heroism and happiness. He sneaks into the game with a simple plan-win a medal-but soon wrecks everything, and accidently unleashes a deadly enemy that threatens every game in the arcade. Ralph only hope? Vanellope von Schweetz (voice of Sarah Silverman), a young troublemaking "glitch" from a candy-coated cart racing game who might just be the one to teach Ralph what it means to be a Good Guy. But will he realize he is good enough to become a hero before it "Game Over" for the entire arcade?',
        video: 'vf4r5q8-aWo'

    },
    {
        name:'How to Train Your Dragon 2 ',
        image:'https://m.media-amazon.com/images/M/MV5BMzMwMTAwODczN15BMl5BanBnXkFtZTgwMDk2NDA4MTE@._V1_.jpg',
        score: '9',
        header: 'https://cinemayward.com/wp-content/uploads/2014/11/maxresdefault.jpg',
        rate: 'Parental Guidance Suggested',
        time: '102 min',
        genre: 'Animated',
        ReleaseDate: '13 June 2014',
        Director: 'Dean DeBlois',
        title: 'Now that Hiccup has trained his dragon, he is left with nothing to do but explore new lands, which in turn causes him to get into all kinds of new trouble--like capturing the attention of an evil conqueror who wants to command all dragons.',
        video: 'VpAcrUZYvmw'
    }
];

var data_comingsoon = [
    {
        name: 'Jumanji: Welcome to the Jungle',
        image: 'https://i.pinimg.com/originals/17/00/e5/1700e55a7303e62edeb279ba9bae8801.jpg'
        
    }, 
    {
        name: 'Warcraft',
        image: 'https://i.pinimg.com/originals/68/0e/ac/680eac03d0da8ba021ea49b0a0731c0c.jpg'
    }, 
    {
        name: 'Wonder Woman',
        image: 'https://content.presspage.com/uploads/1196/c800_wonderwoman.jpg?37128'
    }, 
    {
        name: 'Fantastic Beasts',
        image: 'https://cdn.shopify.com/s/files/1/2356/1293/products/FP4427-FANTASTIC-BEASTS-street_530x@2x.jpg?v=1558989786'
    }, 
    {
        name: 'Tomb Raider',
        image: 'https://i.pinimg.com/originals/e5/d9/0d/e5d90dc2cfd5f47af6a3b8a624db01b2.jpg'
    }, 
    {
        name: 'Logan',
        image: 'https://www.indiewire.com/wp-content/uploads/2017/05/logan-2017.jpg?w=674'
    }, 
    {
        name: 'Alien: Covenant',
        image: 'https://www.filmink.com.au/wp-content/uploads/2018/01/2017-bestposter-aliencovenant-700x1039.jpg'
    }, 
    {
        name: 'World War Z',
        image: 'https://www.joblo.com/assets/images/oldsite/posters/images/full/world_war_z_ver2_xlg.jpg'
    }, 
    {
        name: 'Baby Driver',
        image: 'https://www.filmink.com.au/wp-content/uploads/2018/01/2017-bestposter-babydriver-700x1038.jpg'
    }, 
    {
        name: 'Nobody',
        image: 'https://comic.systems/images/Universal/Nobody/Nobody-affiche-13042'
    }, 
    

];
var data_theater = [
    {
        location: 'Location Bear',
        logo:'https://image.flaticon.com/icons/png/512/73/73168.png',
        theater: ['Bear-A','Bear-B','Bear-C','Bear-D','Bear-E']
    },
    {
        location: 'Location Lion',
        logo:'https://image.flaticon.com/icons/png/512/4710/4710812.png',
        theater: ['Lion-A','Lion-B','Lion-C','Lion-D','Lion-E']
    },
    {
        location: 'Location Kingkong',
        logo:'https://image.flaticon.com/icons/png/512/835/835993.png',
        theater: ['Kingkong-A','Kingkong-B','Kingkong-C','Kingkong-D','Kingkong-E']
    },
    {
        location: 'Location Dragon',
        logo:'https://image.flaticon.com/icons/png/512/2877/2877189.png',
        theater: ['Dragon-A','Dragon-B','Dragon-C','Dragon-D','Dragon-E']
    },
    {
        location:'Location Wolf',
        logo:'https://image.flaticon.com/icons/png/512/627/627147.png',
        theater: ['Wolf-A','Wolf-B','Wolf-C','Wolf-D','Wolf-E']
    }
];
var data_seat = [
    {
    seats: {
        default: [ 
         'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8',
         'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8',
         'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8',
         'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8',
         'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8',
         'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8',
        ],
    }
    }
]


function seedDB(){
    // ลบข้อมูลใน Database ทิ้ง
    // movies.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("Remove DB Completed");
    //     data_now.forEach(function(seed){
    //         movies.create(seed, function(err, EachMovies){
    //             if(err){
    //                 console.log(err);
    //             }else{
    //                 console.log('New Data Added');
                   
    //             }
    //         });
    //     });
    // });   
    // moviesComingsoon.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("Remove DB Completed");
    //     data_comingsoon.forEach(function(seed){
    //         moviesComingsoon.create(seed, function(err, EachMovies){
    //             if(err){
    //                 console.log(err);
    //             }else{
    //                 console.log('New Data Added-comingsoon');
    //             }
    //         });
    //     });
    // }); 
    // Location.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("Remove DB Completed");
    //     data_theater.forEach(function(seed){
    //         Location.create(seed, function(err, EachMovies){
    //             if(err){
    //                 console.log(err);
    //             }else{
    //                 console.log('New Data Added Cinema');
                   
    //             }
    //         });
    //     });
    // });   
    data_seat.forEach(function(seed){
        seat.create(seed, function(err, Each){
            if(err){
                console.log(err);
            }else{
                console.log('New data');
            }
        });
    });
}


module.exports = seedDB;
