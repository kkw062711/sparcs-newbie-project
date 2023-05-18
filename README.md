<!-- 1. postgresql 설치 -->
2. docker 설치
3. docker 디렉토리의 env 폴더에서 password를 설정
4. docker, client, server 디렉토리의 env파일 끝의 .example 삭제
5. npx install -g yarn
--> powershell의 권한을 RemoteSigned로 변경 후 명령어 실행 (기존엔 Restricted)
6. npm install cross-env 
--> package.json 파일에서 환경변수 설정을 위한 npm
--> ENVIRONMENT = "DEVELOPMENT" 를 set ENVIRONMENT = "DEVELOPMENT" 로 수정
7. npx install prisma
8. root 디렉토리의 package.json 파일의 dev:introduce의 printf를 echo로 수정
※ Windows 환경에서는 make 명령어가 작동하지 않기 때문에 GNU make 를 따로 설치해야 하나, 명령어 실행에 별도의 문제가 발생하지 않아 진행하지 않음
<!-- 9. https://sdy-study.tistory.com/79 참고하여 스키마 DB 작성 -->
<!-- 10. postgresql url을 server 디렉토리의 env 파일에 저장 -->
-- DB를 MongoDB로 수정해서 postgresql 관련 항목은 수행하지 않음
-- 이후 웹사이트 개발이 완전히 완료되고, 시간이 남는다면 postgresql과 prisma로 DB를 전환할 예정