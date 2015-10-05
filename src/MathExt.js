/**
 * Created by pikachu on 01.09.2015.
 */
Math.sign = Math.sign || function(x) {
        x = +x; // ??????????? ? ?????
        if (x === 0 || isNaN(x)) {
            return x;
        }
        return x > 0 ? 1 : -1;
    };
Math.customRandom = function (from,to) {
    return Math.round(Math.random()*(to-from)+from);
};
Math.max2 = function (a,b){
    return a>b?a:b;
};
Math.min2 = function (a,b){
    return a<b?a:b;
};

Math.poligonSquare = function (poligon){
    var S=0;
    for(var i =0; i < poligon.length; i++)
    {
        S += (poligon[i].x +poligon[ i+1 == poligon.length? 0 : i+1].x)*(poligon[i].y - poligon[ i+1 == poligon.length? 0 : i+1].y);
    }
    S = Math.abs(S/2);
    return S;

};
Math.normolizePoligon = function (poligon){
    var prev,next;
    for(var i =0; i < poligon.length;)
    {
        prev = i-1 < 0 ? poligon.length-1 : i-1;
        next = i+1 >= poligon.length ? 0 : i+1;
        if((poligon[i].x == poligon[prev].x && poligon[next].x == poligon[prev].x) ||
            (poligon[i].y == poligon[prev].y && poligon[next].y == poligon[prev].y)
        )
            poligon.splice(i,1);
        else
            i++;
    }
};
Math.isInPolygon = function (point,poligon)//in method is laying count of crossing edges
{
    var countCross = 0;
    var point1,point2;
    for(var i = 0; i< poligon.length ; i++)
    {
        point1 = poligon[i];
        point2 = poligon[i+1==poligon.length? 0: i+1];

        if(point1.y == point2.y && point1.y==point.y &&
            ((point.x >=point1.x && point.x <= point2.x ) || (point.x >=point2.x && point.x <= point1.x )))
        {
            return false;
        }

        if(point1.x == point2.x && point1.x==point.x &&
            ((point.y >=point1.y && point.y <= point2.y ) || (point.y >=point2.y && point.y <= point1.y )))
        {
            return false;
        }


        if(point1.y == point2.y) continue;
        if(point1.x<point.x) continue;

        if((point.y >=point1.y && point.y < point2.y ) || (point.y >=point2.y && point.y < point1.y ))
        {
            countCross++;
        }
    }

    return !(countCross % 2 == 0)  ;//если четное то вне многоугольника, если нечетное то внутри многоугольника
};
Math.isLinesCrossing = function (A,B,C,D){
    return  (((C.x- A.x)*(B.y- A.y) - (C.y- A.y)*(B.x- A.x)) *
        ((D.x- A.x)*(B.y- A.y) - (D.y- A.y)*(B.x- A.x)) <= 0)
        &&
        (((A.x- C.x)*(D.y- C.y) - (A.y- C.y)*(D.x- C.x)) *
        ((B.x- C.x)*(D.y- C.y) - (B.y- C.y)*(D.x- C.x)) <= 0)
};


/*Math.isLinesCrossing2 = function (A,B,C,D)
 {

 if (Math.min2(A.x, B.x) > Math.max(C.x, D.x) ||
 Math.max2(A.x, B.x) < Math.min(C.x, D.x) ||
 Math.min2(A.y, B.y) > Math.max(C.y, D.y) ||
 Math.max2(A.y, B.y) < Math.min(C.y, D.y))
 return true;  // Момент, када линии имеют одну общую вершину...


 var dx1 = B.x- A.x, dy1 = B.y- A.y; // Длина проекций первой линии на ось x и y
 var dx2 = D.x- C.x, dy2 = D.y- C.y; // Длина проекций второй линии на ось x и y

 var div, mul;


 if ((div = (dy2*dx1-dx2*dy1)) == 0)
 return false; // Линии параллельны...

 var dxx = A.x- C.x, dyy = A.y- C.y;

 if (div > 0) {
 if ((mul = (dx1*dyy-dy1*dxx)) < 0 || mul > div)
 return false; // Первый отрезок пересекается за своими границами...
 if ((mul = (dx2*dyy-dy2*dxx)) < 0 || mul > div)
 return false; // Второй отрезок пересекается за своими границами...
 }

 if ((mul = -(dx1*dyy-dy1*dxx)) < 0 || mul > -div)
 return false; // Первый отрезок пересекается за своими границами...
 if ((mul = -(dx2*dyy-dy2*dxx)) < 0 || mul > -div)
 return false; // Второй отрезок пересекается за своими границами...

 return true;
 };
 */