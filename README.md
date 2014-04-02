# ngPasscode
An arbitrary length, numeric passcode input element, for Angular.js. Automatically moves you to the next input after you input a numeric value, enforces one character per input field, and adjusts to the size of the passcode needed.

### Usage

Include the script in your HTML: 

```html
<script src="build/passcode.min.js"></script>
```


The `<passcode>` element takes three parameters, each passed through attributes. In your Javascript:

```javascript

angular.controller('myController', function($scope){

  $scope.placeholder = 0;

  // Must be a number
  $scope.passcodeSize = 4;

  // Passcode will always be passed back as a string
  $scope.passcode = '';
  
});
```

and in your HTML: 


```html

<passcode placeholder="placeholder" model="passcode" size="passcodeSize"></passcode>
```

You can even set the properties on the template itself, if you know you're not going to modify the values dynamically:


```html

<passcode placeholder="0" model="passcode" size="4"></passcode>
```

### Demo

![](http://i.imgur.com/tBnthdh.png)

You can check it out on [GitHub Pages](http://ryngonzalez.github.io/ngPasscode).
