module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'Post',
        {
            /*  content: {
                type: DataTypes.TEXT, //길이 무제한
                allowNull: false,
            }, */
        },
        {
            tableName: 'posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            //utf8 => 한글저장, mb4 => 이모티콘 저장
        }
    );
    Post.associate = (db) => {
        db.Post.hasMany(db.Image);
    };
    return Post;
};
