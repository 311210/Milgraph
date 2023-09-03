
# Milgraph

Projekt indywidualny na przedmiot programowanie zespołowe

Aplikacja została stworzona z myślą o ułatwieniu analizy, prezentacji i zrozumienia danych grafowych. Grafy są powszechnie wykorzystywane w dziedzinach takich jak sieci społecznościowe, logistyka, nauka o danych, biologia obliczeniowa i wiele innych. Różne reprezentacje grafów mają swoje zalety i ograniczenia, dlatego aplikacja pozwala na konwersję pomiędzy nimi, umożliwiając użytkownikom korzystanie z odpowiedniego formatu w zależności od ich potrzeb.


# Funkcje Główne

⦁	Konwersja Reprezentacji Grafu: Centralną funkcją aplikacji jest możliwość konwersji pomiędzy różnymi reprezentacjami grafów. Użytkownicy mogą zmieniać między listą sąsiedztwa, macierzą sąsiedztwa oraz listą krawędzi w wersji dla języków Python i Java jak i w wersji custom, zapewniając swobodę manipulacji danymi grafowymi.

⦁	Wizualizacja Grafu: Wizualizacja jest nieodzowna dla zrozumienia złożonych struktur grafowych. Nasza aplikacja pozwala na interaktywną wizualizację grafów, pozwalając użytkownikom eksplorować grafy poprzez dostosowywanie układu. Elastyczność wizualizacji umożliwia ukazanie ukrytych wzorców i informacji. Użytkownicy mogą dostosowywać układ wizualizacji, przesuwać wierzchołki oraz przybliżać/oddalać widok, aby dokładniej przyjrzeć się strukturze grafu.



# Instrukcja instalacji i konfiguracji

⦁	Sklonuj repozytorium z kodem źródłowym z GitHuba
„git clone <https://github.com/311210/Milgraph>”

⦁	Przejdź do katalogu zawierającego kod front-endu 
„cd <ścieżka_do_katalogu_frontend>”

⦁	W terminalu wpisz komendę, aby zainstalować zależności projektu
„npm install”

⦁	Po zainstalowaniu zależności, wpisz komendę, aby uruchomić aplikację w trybie deweloperskim
„npm start”

⦁	Przejdź do katalogu zawierającego kod back-endu
„cd <ścieżka_do_katalogu_backend>”

⦁	W celu izolowania zależności projektu, stwórz wirtualne środowisko
„python -m venv venv”

⦁	Następnie, aktywuj wirtualne środowisko
„venv\Scripts\activate”

⦁	W aktywnym wirtualnym środowisku, zainstaluj zależności za pomocą komendy
„pip install -r requirements.txt”

⦁	W aktywnym wirtualnym środowisku, wpisz komendę, aby uruchomić serwer Flask
„python server.py”
