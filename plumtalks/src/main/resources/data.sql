INSERT INTO user (userId, username, password, verificationCode, enabled)
VALUES
    (1, 'viksa', '{bcrypt}$2a$12$MqnxI5YJd1nQ/sIa2zadS.1.HYkFPRlKBRI/y8M/VCW7UINh1AHWa', 'admin', 1),
    (2, 'boko', '{bcrypt}$2a$12$ihXNy3HhU2ryIm37Ovoz2.kpsBk1dGvSyXPEOZzAYec32aY1oqrpW', '', 1),
    (3, 'kiko', '{bcrypt}$2a$12$U6Dp91O19XK9jB2H3ImZT.0.v4KzguG27Xmp7GlTPxSPVxrwdSKAO', '', 1),
    (4, 'petar', '{bcrypt}$2a$12$1Xm7KhG0ylTLo4gI7G/k8OjFGRFzc/yXhMm65BbRDDvw.Yt7RmVl2', '', 1),
    (5, 'dimi', '{bcrypt}$2a$12$zBFB1dh8ILLrsnyKcRM7wu9N.fZ1y1TCmPkXvxItJoSRgflcZcnWK', '', 1),
    (6, 'pendev', '{bcrypt}$2a$12$2soDmArW5futXPbckBMgvOHPU0NLSOocrNJE.lYdFgHIXSH.KC9tm', '', 1);

INSERT INTO role (roleId, authority)
VALUES
    (1, 'ADMIN'),
    (2, 'USER');

INSERT INTO user_role_junction (userId, roleId)
VALUES (1, 1), (1, 2),
       (2, 2),
       (3, 2),
       (4, 2),
       (5, 2),
       (6, 2);

INSERT INTO message (messageId, senderId, receiverId, content, Timestamp)
VALUES
    (1, 1, 3, 'zdravo kiko', '2024-03-20 12:00:00'),
    (2, 3, 1, 'zdravo viktor', '2024-03-20 13:00:00'),
    (3, 3, 1, 'kako si?', '2024-03-20 13:00:05'),
    (4, 1, 3, 'eve brat terame', '2024-03-21 12:00:00'),
    (5, 3, 1, 'eve i ja brat. go gleav wind rises. predobar e', '2024-03-22 12:00:00');
