(function() {
  angular.module('ngPasscode', []).directive('passcode', [
    '$compile', function($compile) {
      return {
        restrict: 'E',
        replace: true,
        template: '<div class="passcode" ng-class="{invalid: $invalid}"></div>',
        scope: {
          passcode: '=model',
          placeholderValue: '@placeholder',
          passcodeSize: '=size'
        },
        link: function(scope, element, attrs) {
          var arrow, index, modifier, numeric, template, _fn, _i, _ref;
          if (isNaN(scope.passcodeSize)) {
            throw new Error('Must provide numeric passcode size.');
          }
          modifier = function(code) {
            return code === 46 || code === 8 || code === 9 || code === 27 || code === 13 || code === 91;
          };
          numeric = function(code) {
            return (48 <= code && code <= 57);
          };
          arrow = function(code) {
            return (37 <= code && code <= 40);
          };
          template = '<input type="text" placeholder="{{placeholderValue}}">';
          scope.passcodeParts = new Array(scope.passcodeSize);
          _fn = function(index) {
            var child;
            child = $compile(template)(scope);
            child.on('keydown', function(e) {
              if (modifier(e.keyCode) || arrow(e.keyCode)) {
                return;
              }
              if (numeric(e.keyCode)) {
                child.val('');
                return scope.$evalAsync(function() {
                  var _ref1, _ref2;
                  scope.passcodeParts[index] = child.val();
                  return (_ref1 = child.next()) != null ? (_ref2 = _ref1[0]) != null ? _ref2.focus() : void 0 : void 0;
                });
              } else {
                e.preventDefault();
              }
            });
            return element.append(child);
          };
          for (index = _i = 0, _ref = scope.passcodeSize; 0 <= _ref ? _i < _ref : _i > _ref; index = 0 <= _ref ? ++_i : --_i) {
            _fn(index);
          }
          return scope.$watchCollection('passcodeParts', function(parts) {
            var passcode;
            passcode = parts.join('');
            if (passcode.length === scope.passcodeSize) {
              return scope.passcode = passcode;
            } else {
              return scope.$invalid = true;
            }
          });
        }
      };
    }
  ]);

}).call(this);
