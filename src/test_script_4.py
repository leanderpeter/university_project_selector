from server.bo.Person import Person
from server.bo.Student import Student

p = Person()
p.set_id(1)
p.set_rolle(Person.ROLLE_DOZENT)
p.set_name("Peter Thies")
print(p)

s = Student()
s.set_id(2)
s.set_name("Daria")
print(s)