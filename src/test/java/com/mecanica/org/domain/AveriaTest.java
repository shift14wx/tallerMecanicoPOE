package com.mecanica.org.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mecanica.org.web.rest.TestUtil;

public class AveriaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Averia.class);
        Averia averia1 = new Averia();
        averia1.setId(1L);
        Averia averia2 = new Averia();
        averia2.setId(averia1.getId());
        assertThat(averia1).isEqualTo(averia2);
        averia2.setId(2L);
        assertThat(averia1).isNotEqualTo(averia2);
        averia1.setId(null);
        assertThat(averia1).isNotEqualTo(averia2);
    }
}
