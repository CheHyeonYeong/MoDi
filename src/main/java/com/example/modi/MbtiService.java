package com.example.modi;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class MbtiService {

    private final MbtiRepository mbtiRepository;

    public String calResult(MbtiDTO mbtiDto) {
        if (mbtiDto.getE() >= mbtiDto.getI()) {
            mbtiDto.setMbti1("E");
        } else {
            mbtiDto.setMbti1("I");
        }
        if (mbtiDto.getN() >= mbtiDto.getS()) {
            mbtiDto.setMbti2("N");
        } else {
            mbtiDto.setMbti2("S");
        }
        if (mbtiDto.getT() >= mbtiDto.getF()) {
            mbtiDto.setMbti3("T");
        } else {
            mbtiDto.setMbti3("F");
        }
        if (mbtiDto.getP() >= mbtiDto.getJ()) {
            mbtiDto.setMbti4("P");
        } else {
            mbtiDto.setMbti4("J");
        }
        String result = mbtiDto.getMbti1() + mbtiDto.getMbti2() + mbtiDto.getMbti3() + mbtiDto.getMbti4();
        mbtiDto.setResult(result);

        return result;
    }

    public void save(MbtiResult mbtiResult){

        MbtiResult saved = mbtiRepository.save(mbtiResult);
    }

    // 데이터베이스에 저장된 전체 결과 수를 조회
    public long getTotalCount() {
        return mbtiRepository.count();
    }

    // 특정 MBTI 결과의 개수를 조회
    public long getCountByResult(String result){
        return mbtiRepository.countByResult(result);
    }

}
