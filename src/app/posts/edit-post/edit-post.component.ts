import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../state/posts.actions';
import { getPostById } from '../state/posts.selectors';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post;
  postForm: FormGroup;
  postSubscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.postSubscription = this.store.select(getPostById, { id }).subscribe((data) => {
        this.post = data;
        this.createForm();
        console.log('this.post ', this.post);
      });
    });
  }

  onUpdatePost(): void {
    if (!this.postForm.valid) {
      return;
    }

    const post: Post = {
      id: this.post.id,
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }

    this.store.dispatch(updatePost({ post }));
    this.router.navigateByUrl('posts');
  }

  showDescriptionErrors(): string {
    const descriptionControl = this.postForm.get('description');

    if (descriptionControl.touched && descriptionControl.invalid) {
      if (descriptionControl.errors.required) {
        return 'Description is required';
      }

      if (descriptionControl.errors.minlength) {
        return 'Description must be at least 10 chars';
      }
    }

    return null;
  }

  showTitleError(): string {
    const titleControl = this.postForm.get('title');

    if (titleControl.touched && titleControl.invalid) {
      if (titleControl.errors.required) {
        return 'Title is required';
      }

      if (titleControl.errors.minlength) {
        return 'Title must be at least 6 chars';
      }
    }

    return null;
  }

  private createForm(): void {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)])
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
