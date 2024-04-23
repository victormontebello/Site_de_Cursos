#!/bin/bash

build() {
    mvn clean install
}

run() {
    java -jar src/main/java/org.ufg/ufgcloud-1.0-SNAPSHOT.jar
}

clean() {
    mvn clean
}

main() {
    case "$1" in
        build)
            build
            ;;
        run)
            run
            ;;
        clean)
            clean
            ;;
        *)
            echo "Usage: $0 {build|run|clean}"
            exit 1
            ;;
    esac
}

main "$@"
