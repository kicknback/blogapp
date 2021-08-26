package com.codeup.blogapp.data.category;

import com.codeup.blogapp.data.posts.Post;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "categories")
public class Category {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = Post.class
    )
    @JoinTable(
            name = "post_category",
            joinColumns = {@JoinColumn(name = "category_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "post_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )
    private Collection<Post> posts;


    public Category(long id, String name, Collection<Post> posts) {
        this.id = id;
        this.name = name;
        this.posts = posts;
    }

    public Category(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Category() {
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Collection<Post> getPosts() {
        return posts;
    }

    public void setPosts(Collection<Post> posts) {
        this.posts = posts;
    }
}
