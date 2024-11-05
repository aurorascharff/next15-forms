# Outline / Questions

- I’ll first introduce the video/interview, and mention that I have a very special guest
- Brief introduction from Aurora
- Mention the conference and Aurora’s talk
- Overview of what we will do in the video
- We will compare the “classic” way of doing forms (all client side, RHF, onSubmit) to the modern way of doing forms (useActionState, action) by looking at code

## Go over `SignInForm1.tsx`

### What are your general thoughts on this component and way of handling forms?

Fimiliar, library is handling your errors and making the respond to user input easily. Totally fine! Note its using a server function and you might be used to writing api endpoints, so its actually simpler than before.

### What are the good things about it?

Very responsive and you can define easily wether to respond onsubmit, onBlur or onChange which makes them very flexible. Good UX; my impression is most people expect this sort of behavior when filling more complex forms so they can fix errors along the way.

### What are the bad things about it?

Relies on client side js to show validation to the user and submit. That means that before hydration is done it will cause a page reload and push the fields to the url since it cannot call e.preventDefault() which is being done inside react-hook-form. Which means you will lose your values that you inputted which is really bad UX. Cant actually submit the form either without js or before hydration.

### Is it ok to use this in a production application?

Definitely! Especially if your app is suitable and gets value from this sort of form behavior. But remember to also validate on the server, like in the example because the validation you are seeing is only for the sake of the user.

### What about React Native?

I'm sorry but I have never used react native. Maybe you can tell me more about it?

### Are there any improvements we could make to this?

We could of course style it. And do some kind of toast or something on success. The try catch is not doing right now sicne we return something but maybe if we actually i.e submit to a db it can handle that error and show it to the user also in a nice way. You could do a parse instead of safeparse to throw error.

## Go over `SignInForm2.tsx`

### What are the differences between this approach and the first?

This is using the new React 19 hook useActionState bound to server function instead of RHF. Its validating on the server only and just displaying an error if it fails. This will actually use the default form action (extended with react 19) to call a server function as an endpoint.

### What are the benefits of using this new approach?

It does not rely on js to work since its sort of an extended default form action. Turning off js it still works. And works the same before and after hydration and no weird behavior. Really good if the device is slow at processing js, we have a robust form. Also, we don't need to use a library.

### Are there any drawbacks to using this? Do we lose any functionality?

The way it is right now, yes. However we can easily return the values and the errors and display them per field which i have done demos and blogposts on. Whats cool si you can now get validtion errors entirely without relying on js. And get typescript from zof inferring. We can also do a toast in an effect for example and get more interactivity as we could in the RHF.

However we wont get instant validation feedback that RFH does. However you could also add onChange handlers for that. Also i think maybe this conform library is doing this?

### Why is React going in this direction?

Theyre might be trying to embrace the abilities we have now with ssr more and use the exisiting web standards more. Remix has been doing this for a long time but now react itself has more built in support for these things. It follows the server component direction where we unlock these functionalities when we have server functions and so on.

### Can we still use RHF somehow?

Of course! The same was as before! Except now its easier because we have server functions and we dont need api endpoints. We can just call the function directly.

### Conclusion and wrap up
