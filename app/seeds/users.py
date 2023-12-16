from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(
            username = 'Demo',
            first_name = 'Demo',
            last_name = 'Lition',
            bio = "Hey there! I'm Demo-lition, your go-to adventurer in this digital realm. Armed with a keyboard and a knack for smashing bugs, I'm here to explore and ensure a seamless user experience on this fantastic website!",
            location = 'Brooklyn',
            email ='demo@aa.io',
            password ='password'
            ), #1

        User(
            username='Zelda',
            first_name = 'Princess',
            last_name = 'Zelda',
            bio = "Hello! I'm Zelda, your royal companion in the digital realm. Navigating Hyrule and this website with a touch of elegance, I'm here to make your online adventure legendary!",
            location = 'Hyrule',
            image_url = 'https://www.thefandomentals.com/wp-content/uploads/2017/07/breath-of-the-wild-zelda-featured.jpg',
            email='zelda@aa.io',
            password='password'
            ), #2

        User(
            username='Mario',
            first_name = 'Mario',
            last_name = 'Mario',
            bio = "Hey, it's-a me, Mario Mario! Plumbing through pipes by day and saving Princess Peach from Bowser's antics by night. Jump into the adventure with me and let's make the Mushroom Kingdom great again!",
            location = 'Mushrooom Kingdom',
            image_url = 'https://i.pinimg.com/736x/66/34/60/663460a2eeb7cf400b00127099695548.jpg',
            email='mario@aa.io',
            password='password'
            ), #3

        User(
            username='Pikachu',
            first_name = 'Pikachu',
            last_name = 'Sparktail',
            bio = "Pika, Pikachu, pi. Pikachu pi, pika. Pika pi Pikachu, pika pi!",
            location = 'Pokemon World',
            image_url = 'https://i.pinimg.com/736x/e1/9b/f0/e19bf09954ad5231ad9a89cb8db03ec4.jpg',
            email='pikachu@aa.io',
            password='password'
            ),#4

        User(
            username='Spiderman',
            first_name = 'Peter',
            last_name = 'Parker',
            bio = "Swinging into action as Peter Parker, your friendly neighborhood Spider-Man! Web-slinging through cityscapes and cracking jokes, because saving the world is a serious business, but not too serious!",
            location = 'New York City',
            image_url = 'https://hips.hearstapps.com/hmg-prod/images/spiderman-lead-1535732273.jpg',
            email='spiderman@aa.io',
            password='password'
            ), #5

        User(
            username='Steve',
            first_name = 'Steve',
            last_name = 'Craftsman',
            bio = "Greetings, Steve Craftman, square-headed explorer of pixelated world. Building epic structures, surviving zombie invasions, mine, craft to victory!",
            location = 'Minecraft',
            image_url = 'https://cdnb.artstation.com/p/assets/images/images/028/121/791/large/danilo-damiani-cartoon-steve-com-ao.jpg',
            email='steve@minecraft.com',
            password='password'
        ),

        User(
            username='Kirby',
            first_name = 'Kirby',
            last_name = 'Dreamstar',
            bio = "Hi, Kirby Dreamstar, pink puffball appetite! Inhaling enemies, stealing powers – float through digital dreamland!",
            location = 'Dream Land',
            image_url = 'https://files.cults3d.com/uploaders/22884090/illustration-file/b9323e03-4ad2-462c-88f3-e51c86250a58/Kirby-bored.jpg',
            email = 'kirby@aa.io',
            password = 'password'
        ),

        User(
            username = 'Frisk',
            first_name = 'Frisk',
            last_name = 'Freedom',
            bio = "Hey, I'm Frisk Freedom, navigating the Underground with determination. Making choices, facing monsters, and hoping for a happy ending. Join me on this journey, where friendships are forged and love conquers all.",
            location = 'Underground',
            image_url = 'https://i.pinimg.com/736x/fa/81/26/fa8126687030dc4fe84db3e6aeceeaab.jpg',
            email = 'frist.undertale@aa.io',
            password = 'password'
        )
             ]

    [db.session.add(user) for user in users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
