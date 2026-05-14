package org.medient.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.medient.dto.dur.DurCacheDTO;

@Mapper
public interface DurCacheMapper {

    void deleteByUserId(@Param("userId") Long userId);

    void insertCache(DurCacheDTO dto);

    List<DurCacheDTO> findByUserId(@Param("userId") Long userId);
}