;(function(window, angular){
  if (typeof angular === 'undefined') {
    throw new Error('Angular must be defined');
  }

  angular.module('ngPasscode', []).directive('passcode', ['$compile', function($compile) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="passcode"></div>',
      scope: {
        passcode: '=model',
        placeholderValue: '@placeholder',
        passcodeSize: '=size'
      },
      link: function link(scope, element, attrs) {
        if (isNaN(scope.passcodeSize)) {
          throw new Error('Must provide numeric passcode size.');
        }

        var template = '<input type="text" placeholder="{{placeholderValue}}">',
            modifiers = function(code) {
              return ([46, 8, 9, 27, 13, 91].indexOf(code) != -1);
            },
            arrowKeys = function(code){
              return (37 <= code && code <= 40);
            },
            numericKeys = function(code){
              return (48 <= code && code <= 57);
            };

        scope.passcodeParts = new Array(scope.passcodeSize);
        for (var i = 0; i < scope.passcodeSize; i++) {
          (function(index){
            // Link scope to children
            var child = $compile(template)(scope);
            child.on('keydown', function(e){
              // If modifier, keys, let it be
              console.log(e.keyCode);
              if (modifiers(e.keyCode) || arrowKeys(e.keyCode)) {
                return;
              }
              // If numbers are being added and no number is yet inserted
              if (numericKeys(e.keyCode)) {
                child.val('');
                scope.$evalAsync(function(){
                  // Get the added numeral
                  scope.passcodeParts[index] = child.val();
                  var nextElement = child.next();
                  if (typeof nextElement !== 'undefined' && nextElement.length == 1) {
                    // Focus on the next input
                    nextElement[0].focus()
                  }
                });
              // Otherwise, don't let the value be input
              } else {
                e.preventDefault();
                return;
              }
            });
            // Append the child to the directive element
            element.append(child);
          })(i)
        }
        // Watch the passcode parts and update the passcode as needed
        scope.$watchCollection('passcodeParts', function(parts){
          if (typeof parts !== 'undefined' && parts.length) {
            var passcode = parts.join('');
            if (passcode.length === scope.passcodeSize) {
              scope.passcode = passcode;
            }
          }
        });

      }
    }
  }])
})(window, angular);
